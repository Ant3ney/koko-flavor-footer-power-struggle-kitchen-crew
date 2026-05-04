const avatarImages = {
	Anthony: require('../../assets/avatars/Anthony.png'),
	Brad: require('../../assets/avatars/Brad.png'),
	Breanna: require('../../assets/avatars/Breanna.png'),
	Carlose: require('../../assets/avatars/Carlose.png'),
	Cedric: require('../../assets/avatars/Cedric.png'),
	Christian: require('../../assets/avatars/Christian.png'),
	Dave: require('../../assets/avatars/Dave.png'),
	David: require('../../assets/avatars/David.png'),
	Deven: require('../../assets/avatars/Deven.png'),
	Dio: require('../../assets/avatars/Dio.png'),
	Ethan: require('../../assets/avatars/Ethan.png'),
	Gianna: require('../../assets/avatars/Gianna.png'),
	Hiroki: require('../../assets/avatars/Hiroki.png'),
	Hirokitron: require('../../assets/avatars/hirokitron.png'),
	hirokitron: require('../../assets/avatars/hirokitron.png'),
	John: require('../../assets/avatars/John A.png'),
	'John Alvas': require('../../assets/avatars/John A.png'),
	'John The Manager': require('../../assets/avatars/John_The_Manager.png'),
	John_The_Manager: require('../../assets/avatars/John_The_Manager.png'),
	JohnTheManager: require('../../assets/avatars/John_The_Manager.png'),
	Jesse: require('../../assets/avatars/Jesse.png'),
	Josh: require('../../assets/avatars/Josh.png'),
	Justin: require('../../assets/avatars/Justin.png'),
	Kasey: require('../../assets/avatars/Kasey.png'),
	Keani: require('../../assets/avatars/Keani.png'),
	Keith: require('../../assets/avatars/Keith.png'),
	Kevin: require('../../assets/avatars/Kevin.png'),
	Mark: require('../../assets/avatars/Mark.png'),
	Melanie: require('../../assets/avatars/Melanie.png'),
	My: require('../../assets/avatars/My.png'),
	Philip: require('../../assets/avatars/Philip.png'),
	Raniel: require('../../assets/avatars/Raniel.png'),
	Steaven: require('../../assets/avatars/Steaven.png'),
	Steven: require('../../assets/avatars/Steaven.png'),
	Stefene: require('../../assets/avatars/Stefene.png'),
	Stefanie: require('../../assets/avatars/Stefene.png'),
	Taka: require('../../assets/avatars/Taka.png'),
	Tyler: require('../../assets/avatars/Tyler.png'),
	Valerie: require('../../assets/avatars/Valerie.png'),
	Ve: require('../../assets/avatars/Ve.png'),
	Vicky: require('../../assets/avatars/Vicky.png'),
	Xander: require('../../assets/avatars/Xander.png'),
	Yang: require('../../assets/avatars/Yang.png'),
};

export function getAvatarImage(character) {
	const avatarKey = character?.getAvatar ? character.getAvatar() : character?.avatar;
	const firstName = character?.name?.getFirst ? character.name.getFirst() : character?.person?.name?.firstName;
	const fullName = character?.name?.get ? character.name.get() : null;

	return avatarImages[avatarKey] || avatarImages[fullName] || avatarImages[firstName] || null;
}

export default avatarImages;
