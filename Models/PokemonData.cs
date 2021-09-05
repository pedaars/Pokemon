using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class PokemonData
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<FlavorTextEntries> Flavor_Text_Entries { get; set; }
    }

    public class FlavorTextEntries
    {
        public string Flavor_Text { get; set; }

        public static implicit operator string(FlavorTextEntries v)
        {
            throw new NotImplementedException();
        }
    }
}
