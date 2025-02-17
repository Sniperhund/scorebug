"use client"

import Color from "color"
import styles from "./GameViewer.module.css"
import { TeamShirt } from "./TeamShirt"
import { findFlagUrlByIso2Code } from "country-flags-svg"
import { useEffect, useState } from "react"
import { iso31661 } from "iso-3166"

export const GameViewer = () => {
	const [match, setMatch] = useState<any>(null)
	const [half, setHalf] = useState<string>("1st")

	useEffect(() => {
		const update = () => {
			fetch("https://api.scorebug.lucasskt.dk/game")
				.then((res) => {
					if (!res.ok) {
						throw new Error("Failed to fetch")
					}

					return res.json()
				})
				.then((data) => {
					setMatch(data)
				})
				.catch((err) => {
					console.warn(err)
				})
		}

		update()
		const intervalId = setInterval(update, 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	// Change to getting it from the API
	const teamLeftColor = Color("#ff0000").alpha(0.6)
	const teamRightColor = Color("#023672").alpha(0.6)

	if (!match) {
		return <p>Loading...</p>
	}

	return (
		<section className={styles.container}>
			<img src="https://cms.dhf.dk/media/mjclk0pr/hh4a9133.jpeg?width=2560" />

			<section
				style={{
					position: "absolute",
					bottom: "50px",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
				}}
			>
				<section className={styles.scoreBug}>
					<TeamShirt teamColor={teamLeftColor.toString()} left />

					<article className={styles.card}>
						<img
							src={findFlagUrlByIso2Code(match.team1.countryCode)}
						/>
						<p style={{ textTransform: "uppercase" }}>
							{match.team1.shortCountryCode}
						</p>
					</article>

					<p>{match.team1.score}</p>

					<article className={`${styles.card} ${styles.time}`}>
						<p className={styles.time}>{half}</p>
						<p>
							{Math.floor(match.matchTime / 60)
								.toString()
								.padStart(2, "0")}
							:
							{(match.matchTime % 60).toString().padStart(2, "0")}
						</p>
					</article>

					<p>{match.team2.score}</p>

					<article className={styles.card}>
						<p style={{ textTransform: "uppercase" }}>
							{match.team2.shortCountryCode}
						</p>
						<img
							src={findFlagUrlByIso2Code(match.team2.countryCode)}
						/>
					</article>

					<TeamShirt teamColor={teamRightColor.toString()} />
				</section>
			</section>
		</section>
	)
}
