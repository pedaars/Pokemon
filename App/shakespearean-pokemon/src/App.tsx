import React, { FC, useState } from 'react';
import { Button, TextField, withStyles } from '@material-ui/core';
import PokemonImages from './Images/PokemonLogoConfig';
import { PokemonCard } from './Components/PokemonCard';
import axios from 'axios';
import { Loading } from './Components/Loading';
import toast, { Toaster } from 'react-hot-toast';

interface Props {}

declare type Pokemon = {
	name: string;
	description: string;
};

const ColorButton = withStyles(() => ({
	root: {
		backgroundColor: '#2C70B7',
		'&:hover': {
			backgroundColor: '#1E2B5F',
		},
	},
}))(Button);

export const App: FC<Props> = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [pokemonData, setPokemonData] = useState({} as Pokemon);
	const [loading, setLoading] = useState(false);

	const url = 'https://localhost:44330/Pokemon?searchTerm=';

	const onSearchChange = (e: any) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchPokemon = () => {
		if (searchTerm !== '') {
			console.log('search Pokemon', searchTerm);
			setLoading(true);
			axios
				.get(url + searchTerm)
				.then((result) => {
					setLoading(false);
					console.log(result.data);
					setPokemonData(result.data);
				})
				.catch((error) => {
					setLoading(false);
					toast.error('Unexpected error occurred - ' + error.message);
				});
		}
	};

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
				<span style={{ fontFamily: 'lucida handwriting', fontSize: '3rem' }}>Shakespearean</span>
				<div>
					<img style={{ width: '100%', height: 'auto' }} src={PokemonImages.pokemonLogo} />
				</div>
			</div>

			<span style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
				How would William Shakespeare describe your favourite pokemon?
			</span>

			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
				<div style={{ paddingTop: '20px' }}>
					<TextField
						id="pokemon-search"
						label="Enter a Pokemon Name..."
						type="search"
						onChange={onSearchChange}
					/>
					<ColorButton variant="contained" color="primary" onClick={() => handleSearchPokemon()}>
						search
					</ColorButton>
				</div>
			</div>

			{loading && <Loading />}

			{!loading && pokemonData.name && (
				<>
					<PokemonCard
						name={pokemonData.name}
						description={pokemonData.description}
						notFound={false}
					></PokemonCard>
				</>
			)}

			{!loading && pokemonData.name === null && (
				<PokemonCard
					name={'No results Found'}
					description={'Please check your spelling or try another Pokemon name'}
					notFound={true}
				></PokemonCard>
			)}

			<Toaster position="bottom-center" />
		</>
	);
};
