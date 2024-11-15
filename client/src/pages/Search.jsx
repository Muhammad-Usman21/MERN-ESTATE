import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

const Search = () => {
	const navigate = useNavigate();
	const [sidebardata, setSidebardata] = useState({
		serachTerm: "",
		type: "all",
		offer: false,
		parking: false,
		furnished: false,
		sort: "createdAt",
		order: "desc",
	});
	const [loading, setLoading] = useState(false);
	const [listings, setListings] = useState([]);
	const [showMore, setShowMore] = useState(false);

	// console.log(sidebardata);
	// console.log(listings);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromUrl = urlParams.get("searchTerm");
		const typeFromUrl = urlParams.get("type");
		const offerFromUrl = urlParams.get("offer");
		const parkingFromUrl = urlParams.get("parking");
		const furnishedFromUrl = urlParams.get("furnished");
		const sortFromUrl = urlParams.get("sort");
		const orderFromUrl = urlParams.get("order");

		if (
			searchTermFromUrl ||
			typeFromUrl ||
			offerFromUrl ||
			parkingFromUrl ||
			furnishedFromUrl ||
			sortFromUrl ||
			orderFromUrl
		) {
			setSidebardata({
				serachTerm: searchTermFromUrl || "",
				type: typeFromUrl || "all",
				offer: offerFromUrl === "true" ? true : false,
				parking: parkingFromUrl === "true" ? true : false,
				furnished: furnishedFromUrl === "true" ? true : false,
				sort: sortFromUrl || "createdAt",
				order: orderFromUrl || "desc",
			});
		}

		const fetchListings = async () => {
			setLoading(true);
			setShowMore(false);
			const searchQuery = urlParams.toString();
			const res = await fetch(`/api/listing/get?${searchQuery}`);
			const data = await res.json();
			if (data.length >= 9) {
				setShowMore(true);
			} else {
				setShowMore(false);
			}
			setListings(data);
			setLoading(false);
		};

		fetchListings();
	}, [location.search]);

	const handleChange = (e) => {
		if (e.target.id === "searchTerm") {
			setSidebardata({ ...sidebardata, serachTerm: e.target.value });
		}

		if (
			e.target.id === "all" ||
			e.target.id === "rent" ||
			e.target.id === "sale"
		) {
			setSidebardata({ ...sidebardata, type: e.target.id });
		}

		if (
			e.target.id === "parking" ||
			e.target.id === "furnished" ||
			e.target.id === "offer"
		) {
			setSidebardata({
				...sidebardata,
				[e.target.id]:
					e.target.checked || e.target.checked === "true" ? true : false,
			});
		}

		if (e.target.id === "sort_order") {
			const sort = e.target.value.split("_")[0] || "createdAt";
			const order = e.target.value.split("_")[1] || "desc";
			setSidebardata({ ...sidebardata, sort, order });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams();
		urlParams.set("searchTerm", sidebardata.serachTerm);
		urlParams.set("type", sidebardata.type);
		urlParams.set("offer", sidebardata.offer);
		urlParams.set("parking", sidebardata.parking);
		urlParams.set("furnished", sidebardata.furnished);
		urlParams.set("sort", sidebardata.sort);
		urlParams.set("order", sidebardata.order);
		const searchQuery = urlParams.toString();
		navigate(`/search?${searchQuery}`);
	};

	const onShowMoreClick = async () => {
		const numberOfListings = listings.length;
		const startIndex = numberOfListings;
		const urlParams = new URLSearchParams(location.search);
		urlParams.set("startIndex", startIndex);
		const searchQuery = urlParams.toString();
		const res = await fetch(`/api/listing/get?${searchQuery}`);
		const data = await res.json();
		if (data.length < 9) {
			setShowMore(false);
		}
		setListings([...listings, ...data]);
	};

	return (
		<div className="flex flex-col md:flex-row">
			<div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:fixed md:w-[375px] mt-[72px]">
				<form onSubmit={handleSubmit} className="flex flex-col gap-8">
					<div className="flex items-center gap-2">
						<label className="whitespace-nowrap font-semibold">
							Search Term:
						</label>
						<input
							type="text"
							id="searchTerm"
							placeholder="Search..."
							className="border rounded-lg p-3 w-full"
							value={sidebardata.serachTerm}
							onChange={handleChange}
						/>
					</div>
					<div className="flex gap-4 flex-wrap items-center">
						<label className="font-semibold">Type:</label>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="all"
								className="w-5"
								checked={sidebardata.type === "all"}
								onChange={handleChange}
							/>
							<span>Rent & Sale</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="rent"
								className="w-5"
								checked={sidebardata.type === "rent"}
								onChange={handleChange}
							/>
							<span>Rent</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="sale"
								className="w-5"
								checked={sidebardata.type === "sale"}
								onChange={handleChange}
							/>
							<span>Sale</span>
						</div>
					</div>
					<div className="flex gap-6 flex-wrap items-center">
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="offer"
								className="w-5"
								checked={sidebardata.offer === true}
								onChange={handleChange}
							/>
							<span>Offer</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="parking"
								className="w-5"
								checked={sidebardata.parking === true}
								onChange={handleChange}
							/>
							<span>Parking</span>
						</div>
						<div className="flex gap-2">
							<input
								type="checkbox"
								id="furnished"
								className="w-5"
								checked={sidebardata.furnished === true}
								onChange={handleChange}
							/>
							<span>Furnished</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<label className="whitespace-nowrap font-semibold">Sort:</label>
						<select
							id="sort_order"
							className="border rounded-lg p-3"
							onChange={handleChange}
							// defaultValue={"createdAt_desc"}>
							defaultValue={`${sidebardata.sort}_${sidebardata.order}`}>
							<option value="createdAt_desc">Latest</option>
							<option value="createdAt_asc">Oldest</option>
							<option value="regularPrice_desc">Price high to low</option>
							<option value="regularPrice_asc">Price low to high</option>
						</select>
					</div>
					<button className="bg-slate-700 text-white p-3 rounded-lg  upperrcase hover:opacity-95">
						Search
					</button>
				</form>
			</div>
			<div className="flex-1 md:ml-[375px] md:mt-[72px]">
				<h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5 text-center">
					Listing results
				</h1>
				<div className="p-7 flex flex-wrap gap-4 justify-center">
					{!loading && listings.length === 0 && (
						<p className="text-xl text-slate-700 text-center w-full">
							No listing found!
						</p>
					)}
					{loading && (
						<p className="text-xl text-slate-700 text-center w-full">
							Loading...
						</p>
					)}
					{!loading &&
						listings &&
						listings.map((listing) => (
							<ListingCard key={listing._id} listing={listing} />
						))}

					{showMore && (
						<button
							onClick={onShowMoreClick}
							className="text-green-700 hover:underline mt-5 w-full text-center">
							Show more
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
