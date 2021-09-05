
using Models;
using System.Threading.Tasks;

namespace Pokemon.Logic.Pokemon
{
    public interface IPokemonLogic
    {
        Task<PokemonCharacter> GetPokemonByNameAsync(string searchTerm);
    }
}
