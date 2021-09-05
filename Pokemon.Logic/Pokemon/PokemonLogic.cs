using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Pokemon.Logic.Pokemon
{
    public class PokemonLogic : IPokemonLogic
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly AppSettings _appSettings;
        private readonly IMemoryCache _memoryCache;

        public PokemonLogic(IHttpClientFactory clientFactory, IOptions<AppSettings> appSettings, IMemoryCache memoryCache)
        {
            _clientFactory = clientFactory;
            _appSettings = appSettings.Value;
            _memoryCache = memoryCache;
        }

        public async Task<PokemonCharacter> GetPokemonByNameAsync(string searchTerm)
        {
            bool validSearchTerm = ValidateSearchTerm(searchTerm);

            if (validSearchTerm)
            {
                var cacheKey = $"pokemon-character-{searchTerm}";

                if (!_memoryCache.TryGetValue(cacheKey, out PokemonCharacter pokemonData))
                {
                    HttpClient client = _clientFactory.CreateClient("pokemon");
                    string url = _appSettings.PokemonAPI + searchTerm;
                    HttpResponseMessage response = await client.GetAsync(url).ConfigureAwait(false);

                    if (response.IsSuccessStatusCode)
                    {
                        PokemonData data = await response.Content.ReadAsAsync<PokemonData>();
                        FlavorTextEntries match = data.Flavor_Text_Entries.FirstOrDefault(x => x.Flavor_Text.ToLower().Contains(searchTerm));
                        string replacedText = match.Flavor_Text.Replace("\n", " ").Replace("\f", " ");
                        string shakesperedPokemonDescription = await GetShakespeareTranslation(replacedText);

                        PokemonCharacter pokemon = new()
                        {
                            Name = data.Name,
                            Description = shakesperedPokemonDescription
                        };

                        //adding a 24 hour cache for pokemon data due to request limitations of the shakespeare translation endpoint
                        _memoryCache.Set(cacheKey, pokemon, new TimeSpan(24, 0, 0));

                        return pokemon;
                    }
                    else
                    {
                        PokemonCharacter emptyPokemon = new()
                        {
                            Name = null,
                            Description = null
                        };

                        return emptyPokemon;
                    }
                }

                return pokemonData;
            }
            else
            {
                throw new ArgumentException($"{nameof(searchTerm)} - Pokemon name cannot be null or empty");
            }
        }

        public async Task<string> GetShakespeareTranslation(string pokemonDescription)
        {
            if (String.IsNullOrEmpty(pokemonDescription))
            {
                throw new ValidationException($"{nameof(pokemonDescription)} - Pokemon description cannot be null or empty");
            }
            else
            {
                HttpClient client = _clientFactory.CreateClient("shakespeare");

                string url = _appSettings.ShakespeareAPI + pokemonDescription;
                HttpResponseMessage response = await client.GetAsync(url).ConfigureAwait(false);

                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsAsync<ShakespeareData>();                    

                    return data.Contents.Translated;
                }
                else
                {
                    throw new HttpRequestException(response.ReasonPhrase);
                }
            }
        }

        private static bool ValidateSearchTerm(string searchTerm)
        {
            if (String.IsNullOrEmpty(searchTerm))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
