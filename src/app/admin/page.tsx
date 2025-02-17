"use client"

import { ButtonPlayer1, ButtonPlayer2 } from "@/components/Admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"

export default function Homepage() {
	const [match, setMatch] = useState<any>(null)

	const [team1Score, setTeam1Score] = useState(0)
	const [team2Score, setTeam2Score] = useState(0)

	const matchTimeFocused = useRef(false)
	const [matchTime, setMatchTime] = useState(0)

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

					setTeam1Score(data.team1.score)
					setTeam2Score(data.team2.score)

					if (matchTimeFocused.current == false) {
						setMatchTime(data.matchTime)
					}
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

	const submit = () => {}

	if (!match) {
		return <p>Loading... or no match started</p>
	}

	return (
		<section className="w-screen h-screen flex items-center justify-center p-52">
			<section className="w-full h-full grid grid-cols-3 gap-6 px-10">
				<Card>
					<CardHeader>Team 1</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<Button variant="outline">Vælg Landkode</Button>
						<Input placeholder="DEN" />
						<Input placeholder="DK" />
					</CardContent>
				</Card>
				<Card>
					<CardHeader>Timer</CardHeader>
					<CardContent>
						{/* @ts-ignore */}
						<Input
							type="number"
							value={matchTime}
							onFocus={() => (matchTimeFocused.current = true)}
							onBlur={() => (matchTimeFocused.current = false)}
							onChange={(e) => {
								setMatchTime(Number(e.target.value))
								submit()
							}}
						/>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>Team 2</CardHeader>
					<CardContent>Card</CardContent>
				</Card>
			</section>
		</section>
	)

	return (
		<>
			<ButtonPlayer1
				count={team1Score}
				setCount={setTeam1Score}
				submit={submit}
			/>
			<ButtonPlayer2
				count={team2Score}
				setCount={setTeam2Score}
				submit={submit}
			/>
		</>
	)
}
