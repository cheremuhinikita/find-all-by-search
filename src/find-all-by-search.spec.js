const axios = require('axios');

const findAllBySearch = require('./find-all-by-search');
const findAllBySearchSolution = require('./find-all-by-search.solution');

describe('Abstract find all by search', () => {
	let data;
	const errorMessage = 'Property is not string'

	beforeEach(async () => {
		await axios
			.get('http://www.json-generator.com/api/json/get/bRpnlAMPhe?indent=2')
			.then((res) => {
				data = res.data;
			});
	});

	it('search for eye color with "blue" value', () => {
		const args = [data, ['eyeColor'], 'blue']

		const resultSolution = findAllBySearchSolution(...args)
		const result = findAllBySearch(...args)

		expect(result).toEqual(resultSolution);
	});

	it('search for favoriteFruit with "a" value', () => {
		const args = [data, ['favoriteFruit'], 'a']

		const resultSolution = findAllBySearchSolution(...args)
		const result = findAllBySearch(...args)

		expect(result.length).toBe(data.length);
		expect(result).toEqual(resultSolution);
	});

	it('search for favoriteFruit with "wtf" value', () => {
		const args = [data, ['favoriteFruit'], 'wtf']

		const resultSolution = findAllBySearchSolution(...args)
		const result = findAllBySearch(...args)

		expect(result).toHaveLength(0);
		expect(result).toEqual(resultSolution);
	});

	it('check if an exception is thrown if the value is not a string', () => {
		const args = [data, ['id'], '']

		expect(() => findAllBySearch(...args)).toThrow(errorMessage);
	});
});
