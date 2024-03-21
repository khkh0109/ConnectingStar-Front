export default function generateStars() {
	const stars = [];
	const numberOfStars = 200;

	for (let i = 0; i < numberOfStars; i++) {
		const cx = Math.random() * window.innerWidth; // 별의 위치 랜덤 설정
		const cy = Math.random() * window.innerHeight; // 별의 위치 랜덤 설정
		const r = Math.random() * 1; // 별의 반지름 랜덤 설정 (별의 크기)
		stars.push({
			id: i,
			cx,
			cy,
			r,
		});
	}

	return stars;
}
