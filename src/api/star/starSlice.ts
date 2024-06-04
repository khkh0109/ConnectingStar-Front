import { StarDataType } from "@/types/star";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getStarCardDetail } from "@/api/star/starThunk";

import { STAR_CARD_DETAIL_STATUS } from "@/constants/starPageConstants";

const initialState: StarDataType = {
	isLoading: false,
	starCardDetail: {
		constellationId: 0,
		typeName: "",
		name: "",
		story: "",
		identity: "",
		image: "",
		starCount: 0,
		status: STAR_CARD_DETAIL_STATUS.SELECT,
		isProfile: false,
	},
};

const starSlice = createSlice({
	name: "star",
	initialState,
	reducers: {
		updateIsProfile: (state, action: PayloadAction<{ isProfile: boolean }>) => {
			state.starCardDetail.isProfile = action.payload.isProfile;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStarCardDetail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getStarCardDetail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.starCardDetail = action.payload.data;
			})
			.addCase(getStarCardDetail.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export const { updateIsProfile } = starSlice.actions;
export const starReducer = starSlice.reducer;
