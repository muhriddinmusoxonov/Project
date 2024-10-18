const { ResData } = require('../../lib/resData');
const { regionService } = require('./service');

class RegionController{
    #regionService;
    constructor(regionService) {
        this.#regionService = regionService;
    }

    async regionCreate(req, res, next) {
        try {
            let { name, stateId } = req.body;

            if (!name || !stateId) {
                const resdata = new ResData('all input is required');
                return res.render('regions.ejs', resdata);
            }

            stateId = Number(stateId);

            if (isNaN(stateId)) {
                const resData = new ResData('stateId is not a number', 400);
                return res.render('region.ejs', resData);
            }

            const state = await this.#regionService.checkState(stateId);

            if (!state) {
                const resData = new ResData('State is not found');
                return res.render('regions.ejs', resData);
            }

            await this.#regionService.createRegion({ name, stateId });

            res.redirect('/api/region')
        } catch (error) {
            next(error);
        }
    }

    async deleteRegion(req, res, next) {
        let { name } = req.body;
        let regions = await this.#regionService.allRegion();

        if (!name) {
            return res.render('error.ejs', new ResData('input is required', 400));
        }

        const regionI = await regions.findIndex((el) => el.name === name);

        if (regionI === -1) {
            return res.render('error.ejs', new ResData('Region is not found', 404));
        }

        const data = await this.#regionService.deleteRegion(regionI);

        const resData = new ResData('deleted', 200, data);

        res.render('regions.ejs', resData);
    }
}

const regionCotroller = new RegionController(regionService);

module.exports = {regionCotroller}