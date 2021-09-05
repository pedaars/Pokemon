using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using Pokemon.Logic.Pokemon;
using System;
using System.Threading.Tasks;

namespace Pokemon.Controllers
{
    [Route("[controller]")]
    public class PokemonController : Controller
    {
        private readonly IPokemonLogic _pokemonLogic;

        public PokemonController(IPokemonLogic pokemonLogic)
        {
            _pokemonLogic = pokemonLogic;
        }

        [ProducesResponseType(typeof(PokemonCharacter), 200)]
        [ProducesResponseType(typeof(string), 500)]
        [HttpGet]
        public async Task<IActionResult> GetPokemon(string SearchTerm)
        {
            IActionResult response;

            try
            {
                PokemonCharacter pokemon = await _pokemonLogic.GetPokemonByNameAsync(SearchTerm).ConfigureAwait(false);
                response = Ok(pokemon);

                return response;
            }
            catch (Exception exp)
            {
                return StatusCode(500, exp.Message);
            }            
        }
    }
}
