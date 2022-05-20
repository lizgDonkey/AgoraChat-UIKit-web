import React, { memo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import store from "../../../redux/index";
import MessageActions from "../../../redux/message";
import ReactionIcon from "./renderReactionIcon";
import addReactionIcon from "../../../common/icons/add_reaction@2x.png";
const useStyles = makeStyles((theme) => ({
	iconStyley: {
		height: "24px",
		width: "24px",
		cursor: "pointer",
	},
	conatiner: {
		height: "24px",
		width: "24px",
		float: (props) => (props.bySelf? 'right':'left'),
	}
}));

const Reaction = ({ message }) => {
	const classes = useStyles({});
	const [reactionVisible, setReactionVisible] = useState(null);
	const handleClickEmoji = (e) => {
		setReactionVisible(e.currentTarget);
	};
	const handleEmojiClose = () => {
		setReactionVisible(null);
	};
	const handleEmojiSelected = (emoji) => {
		if (!emoji) return;
		console.log('>>> handleEomji');
		store.dispatch(MessageActions.addReactions(message, emoji));
	};

	return (
		<div className={classes.conatiner}>
			<img
				src={addReactionIcon}
				alt="reaction"
				className={classes.iconStyley}
				onClick={handleClickEmoji}
			/>
			<ReactionIcon
				anchorEl={reactionVisible}
				onSelected={handleEmojiSelected}
				onClose={handleEmojiClose}
				message={message}
			/>
		</div>
	);
};

export default memo(Reaction);