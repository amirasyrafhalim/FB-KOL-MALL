import BaseApi from './baseApi';

export default class VideoApi extends BaseApi {
	constructor(axios, helper) {
		super(axios, helper, 'videos');
	}
}
