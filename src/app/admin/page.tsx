"use client"

import { ButtonPlayer1, ButtonPlayer2 } from "@/components/Admin"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"

export default function Homepage() {
	const [match, setMatch] = useState<any>(null)

	const [team1Score, setTeam1Score] = useState(0)
	const [team2Score, setTeam2Score] = useState(0)

	const [pauseTimer, setPauseTimer] = useState(false)

	const matchTimeFocused = useRef(false)
	const [matchTime, setMatchTime] = useState(0)

	const [token, setToken] = useState("")
	const [open, setOpen] = useState(false)

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

					setPauseTimer(data.pauseTimer)

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

		setOpen(true)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	const submit = ({
		_team1Score = team1Score,
		_team2Score = team2Score,
		_pauseTimer = pauseTimer,
	}: {
		_team1Score?: number
		_team2Score?: number
		_pauseTimer?: boolean
	}) => {
		const matchData = match

		if (!matchData) return

		if (team1Score < 0) setTeam1Score(0)
		if (team2Score < 0) setTeam2Score(0)
		if (matchTime < 0) setMatchTime(0)

		if (_team1Score != matchData.team1.score)
			matchData.team1.score = _team1Score
		if (_team2Score != matchData.team2.score)
			matchData.team2.score = _team2Score
		if (matchTime != matchData.matchTime) matchData.matchTime = matchTime
		if (_pauseTimer != matchData.pauseTimer)
			matchData.pauseTimer = _pauseTimer

		fetch("https://api.scorebug.lucasskt.dk/admin/game", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(matchData),
		})
			.then((res) => {
				if (!res.ok) {
					setOpen(true)
				}
			})
			.catch((err) => {
				console.warn(err)
			})
	}

	if (!match) {
		return <p>Loading... or no match started</p>
	}

	return (
		<>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							You have to supply a admin token
						</AlertDialogTitle>
						<Input
							value={token}
							onChange={(e) => {
								setToken(e.target.value)
							}}
						/>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction
							onClick={() => {
								setOpen(false)
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<section className="w-screen h-screen flex items-center justify-center p-52">
				<section className="w-full h-full grid grid-cols-3 gap-6 px-10">
					<Card>
						<CardHeader>Team 1</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<Button
								variant="outline"
								onClick={() => {
									setTeam1Score(team1Score + 1)
									submit({
										_team1Score: team1Score + 1,
									})
								}}
							>
								Giv 1 mål
							</Button>
							{/* @ts-ignore */}
							<Input
								type="number"
								value={team1Score}
								onChange={(e) => {
									setTeam1Score(Number(e.target.value))
									submit({})
								}}
							/>
							<Button
								variant="outline"
								onClick={() => {
									setTeam1Score(team1Score - 1)
									submit({
										_team1Score: team1Score - 1,
									})
								}}
							>
								Fjern 1 mål
							</Button>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>Timer</CardHeader>
						<CardContent className="flex flex-col gap-4">
							{/* @ts-ignore */}
							<Input
								type="number"
								value={matchTime}
								onFocus={() =>
									(matchTimeFocused.current = true)
								}
								onBlur={() =>
									(matchTimeFocused.current = false)
								}
								onChange={(e) => {
									setMatchTime(Number(e.target.value))
									submit({})
								}}
							/>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="terms"
									checked={pauseTimer}
									onCheckedChange={() => {
										setPauseTimer(!pauseTimer)
										submit({
											_pauseTimer: !pauseTimer,
										})
									}}
								/>
								<label
									htmlFor="terms"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Pause timer
								</label>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>Team 2</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<Button
								variant="outline"
								onClick={() => {
									setTeam2Score(team2Score + 1)
									submit({
										_team2Score: team2Score + 1,
									})
								}}
							>
								Giv 1 mål
							</Button>
							{/* @ts-ignore */}
							<Input
								type="number"
								value={team2Score}
								onChange={(e) => {
									setTeam2Score(Number(e.target.value))
									submit({})
								}}
							/>
							<Button
								variant="outline"
								onClick={() => {
									setTeam2Score(team2Score - 1)
									submit({
										_team2Score: team2Score - 1,
									})
								}}
							>
								Fjern 1 mål
							</Button>
						</CardContent>
					</Card>
				</section>
			</section>
		</>
	)
}
