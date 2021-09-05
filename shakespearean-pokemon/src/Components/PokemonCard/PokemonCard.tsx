import React, { useEffect, useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardMedia } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Pokeball from '../../Images/Pokeball.Config';

declare type cardProps = {
	name: string;
	description: string;
	notFound: boolean;
};

export const PokemonCard = (props: cardProps) => {
	const [pokemonName, setPokemonName] = useState('');
	const [pokemonDescription, setPokemonDescription] = useState('');
	const [showNotFound, setShowNotFound] = useState(props.notFound);

	useEffect(() => {
		if (props.name !== pokemonName) {
			setPokemonName(props.name);
		}
		if (props.description !== pokemonDescription) {
			setPokemonDescription(props.description);
		}
	}, [props]);

	return (
		<div style={{ paddingTop: '20px', display: 'flex', width: '100%', justifyContent: 'space-around' }}>
			<Card style={{ width: '100%', maxWidth: '345px' }}>
				<CardMedia
					style={{ height: '140px', width: '130px', margin: 'auto' }}
					image={showNotFound ? Pokeball.pokeballImage : Pokeball.PokeballOpenImage}
					title="Pokeball"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{pokemonName}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{pokemonDescription}
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
};
