import styles from "./GameViewer.module.css"

export const TeamShirt = ({
	teamColor,
	left = false,
}: {
	teamColor: string
	left?: boolean
}) => {
	return (
		<div
			className={`${left ? styles.teamLeft : styles.teamRight} ${
				styles.team
			}`}
			style={{
				backgroundColor: teamColor,
			}}
		/>
	)
}
