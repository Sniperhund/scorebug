"use client"

import Color from "color"
import styles from "./GameViewer.module.css"
import { TeamShirt } from "./TeamShirt"
import { findFlagUrlByIso2Code } from "country-flags-svg"

export const GameViewer = () => {
	// Fetch the current match from the backend
	// const match = fetch(...
	const match = {
		team1: {
			countryCode: "DK",
			shortCountryName: "DEN",
			score: 0,
		},
		team2: {
			countryCode: "IS",
			shortCountryName: "ICE",
			score: 0,
		},
	}

	// Change to getting it from the API
	const teamLeftColor = Color("#ff0000").alpha(0.6)
	const teamRightColor = Color("#023672").alpha(0.6)

	return (
		<section className={styles.container}>
			<img src="https://cms.dhf.dk/media/mjclk0pr/hh4a9133.jpeg?width=2560" />

			<section className={styles.scoreBug}>
				<TeamShirt teamColor={teamLeftColor.toString()} left />

				<article className={styles.card}>
					<img src={findFlagUrlByIso2Code(match.team1.countryCode)} />
					<p>{match.team1.shortCountryName}</p>
				</article>

				<p>{match.team1.score}</p>

				<article className={`${styles.card} ${styles.time}`}>
					<p className={styles.time}>2nd half</p>
					<p>40:49</p>
				</article>

				<p>{match.team2.score}</p>

				<article className={styles.card}>
					<img src={findFlagUrlByIso2Code(match.team2.countryCode)} />
					<p>{match.team2.shortCountryName}</p>
				</article>

				<TeamShirt teamColor={teamRightColor.toString()} />
			</section>
		</section>
	)
}
