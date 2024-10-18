const { ResData } = require('../../lib/resData');
const { districtService } = require('./service');

class DistrictController{
    #districtService;
    constructor(districtService) {
        this.#districtService = districtService;
    }

    async districtCreate(req, res, next) {
        try {
            let { name, regionId } = req.body;

            if (!name || !regionId) {
                const resdata = new ResData('all input is required');
                return res.render('districts.ejs', resdata);
            }

            regionId = Number(regionId);

            if (isNaN(regionId)) {
                const resData = new ResData('regionId is not a number', 400);
                return res.render('districts.ejs', resData);
            }

            const region = await this.#districtService.checkRegion(regionId);

            if (!region) {
                const resData = new ResData('Region is not found');
                return res.render('districts.ejs', resData);
            }

            await this.#districtService.createDistrict({ name, regionId });

            res.redirect('/api/district')
        } catch (error) {
            next(error);
        }
    }

    async deleteDistricts(req, res, next) {
        let { name } = req.body;
        let districts = await this.#districtService.allDistricts();

        if (!name) {
            return res.render('error.ejs', new ResData('input is required', 400));
        }

        const districtsI = await districts.findIndex((el) => el.name === name);

        if (districtsI === -1) {
            return res.render('error.ejs', new ResData('District is not found', 404));
        }

        const data = await this.#districtService.deleteDistricts(districtsI);

        const resData = new ResData('deleted', 200, data);

        res.render('districts.ejs', resData);
    }
}

const districtController = new DistrictController(districtService);

module.exports = {districtController}