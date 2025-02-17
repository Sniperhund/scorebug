"use client"

import { useState } from "react"
import { Button } from "./ui/button"

export function ButtonPlayer1({ count, setCount, submit }: any) {
	function handleClick() {
		setCount(count + 1)
		submit()
	}

	return (
		<Button variant="secondary" onClick={handleClick}>
			Team 1: {count}
		</Button>
	)
}

export function ButtonPlayer2({ count, setCount, submit }: any) {
	function handleClick() {
		setCount(count + 1)
		submit()
	}

	return (
		<Button variant="secondary" onClick={handleClick}>
			Team 2: {count}
		</Button>
	)
}
