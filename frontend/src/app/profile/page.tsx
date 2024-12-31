type Profile = {
	id: number;
	name: string;
};

const sampleUser: Profile = {
	id: 1,
	name: "sample ",
};

export default function Profile() {
	return (
		<div>
			<h1 className="font-bold p-2">Profile</h1>
		</div>
	);
}
