import * as React from 'react'
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
const {
	useDrop,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

const style: React.CSSProperties = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

export interface DustbinProps {
	accept: string[]
	lastDroppedItem?: any
	onDrop: (item: any) => void
}

const Dustbin: React.FC<DustbinProps> = ({
	accept,
	lastDroppedItem,
	onDrop,
}) => {
	const [{ isOver, canDrop }, ref] = useDrop({
		accept,
		drop: item => onDrop(item),
		collect: monitor => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	})

	const isActive = isOver && canDrop
	let backgroundColor = '#222'
	if (isActive) {
		backgroundColor = 'darkgreen'
	} else if (canDrop) {
		backgroundColor = 'darkkhaki'
	}

	return (
		<div ref={ref} style={{ ...style, backgroundColor }}>
			{isActive
				? 'Release to drop'
				: `This dustbin accepts: ${accept.join(', ')}`}

			{lastDroppedItem && (
				<p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
			)}
		</div>
	)
}

export default Dustbin
