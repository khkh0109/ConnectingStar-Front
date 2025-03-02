import Slider from "react-slick";

import { adviceImages } from "@/constants/homeConstants";

import { advicesWrapperStyle } from "@/components/Habit/HabitAdviceBanner/HabitAdviceBanner.style";

function HabitAdviceBanner() {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipe: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 5000,
	};

	return (
		<div css={advicesWrapperStyle}>
			<Slider {...settings}>
				{adviceImages.map((image) => (
					<div key={image.src}>
						<img src={image.webp} alt={image.alt} />
					</div>
				))}
			</Slider>
		</div>
	);
}

export default HabitAdviceBanner;
