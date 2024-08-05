import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingCard from "../components/ListingCard";

const Home = () => {
	const [offerListings, setOfferListings] = useState([]);
	const [rentListings, setRentListings] = useState([]);
	const [saleListings, setSaleListings] = useState([]);
	SwiperCore.use([Navigation]);

	// console.log(offerListings);

	useEffect(() => {
		const fetchOfferListings = async () => {
			try {
				const res = await fetch(
					"/api/listing/get?offer=true&sort=createdAt&order=desc&limit=4"
				);
				const data = await res.json();
				setOfferListings(data);
				fetchRentListings();
			} catch (error) {
				console.log(error);
			}
		};

		const fetchRentListings = async () => {
			try {
				const res = await fetch(
					"/api/listing/get?type=rent&sort=createdAt&order=desc&limit=4"
				);
				const data = await res.json();
				setRentListings(data);
				fetchSaleListings();
			} catch (error) {
				console.log(error);
			}
		};

		const fetchSaleListings = async () => {
			try {
				const res = await fetch(
					"/api/listing/get?type=sale&sort=createdAt&order=desc&limit=4"
				);
				const data = await res.json();
				setSaleListings(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchOfferListings();
	}, []);

	return (
		<div>
			<div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
				<h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
					Find your next <span className="text-slate-500">perfect</span>
					<br />
					place with ease
				</h1>
				<p className="text-gray-400 text-xs sm:text-sm">
					Real Estate is te best place to find your next perfect place to live.
					<br />
					We have a wide range of properties for you to choose from.
				</p>
				<p>
					<Link
						to={"/search"}
						className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
						Lets get started...
					</Link>
				</p>
			</div>

			<Swiper navigation>
				{offerListings &&
					offerListings.length > 0 &&
					offerListings.map((listing) => (
						<SwiperSlide key={listing._id}>
							<div
								className="h-[500px]"
								style={{
									background: `url(${listing.imageUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}></div>
						</SwiperSlide>
					))}
			</Swiper>

			<div className="max-w-full p-3 flex flex-col gap-8 my-10 mx-10">
				{offerListings && offerListings.length > 0 && (
					<div>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent offers
							</h2>
							<Link
								to={"/search?offer=true&sort=createdAt&order=desc"}
								className="text-sm text-blue-600 hover:underline">
								Show more offers
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{offerListings.map((listing) => (
								<ListingCard key={listing._id} listing={listing} />
							))}
						</div>
					</div>
				)}
				{rentListings && rentListings.length > 0 && (
					<div>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent places for rent
							</h2>
							<Link
								to={"/search?type=rent&sort=createdAt&order=desc"}
								className="text-sm text-blue-600 hover:underline">
								Show more places for rents
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{rentListings.map((listing) => (
								<ListingCard key={listing._id} listing={listing} />
							))}
						</div>
					</div>
				)}
				{saleListings && saleListings.length > 0 && (
					<div>
						<div className="my-3">
							<h2 className="text-2xl font-semibold text-slate-600">
								Recent places for sales
							</h2>
							<Link
								to={"/search?type=sale&sort=createdAt&order=desc"}
								className="text-sm text-blue-600 hover:underline">
								Show more places for sales
							</Link>
						</div>
						<div className="flex flex-wrap gap-4">
							{saleListings.map((listing) => (
								<ListingCard key={listing._id} listing={listing} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
