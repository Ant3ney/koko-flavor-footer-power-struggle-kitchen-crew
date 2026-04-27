const avatarImages = {
	Anthony: require('../../assets/avatars/Anthony.png'),
	Brad: require('../../assets/avatars/Brad.png'),
	Dave: require('../../assets/avatars/Dave.png'),
	John: require('../../assets/avatars/John A.png'),
	Keani: require('../../assets/avatars/Keani.png'),
	My: require('../../assets/avatars/My.png'),
	Raniel: require('../../assets/avatars/Raniel.png'),
	Vicky: require('../../assets/avatars/Vicky.png'),
	Xander: require('../../assets/avatars/Xander.png'),
};

export function getAvatarImage(character) {
	const avatarKey = character?.getAvatar ? character.getAvatar() : character?.avatar;
	const firstName = character?.name?.getFirst ? character.name.getFirst() : character?.person?.name?.firstName;

	return avatarImages[avatarKey] || avatarImages[firstName] || null;
}

export default avatarImages;
