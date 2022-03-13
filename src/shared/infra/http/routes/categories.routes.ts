import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import Router from 'express'
import multer from 'multer'

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController'
import { ensureAdmin } from '../middlewares/ensureAdmin'


const categoriesRoute = Router()

const upload = multer({
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()



categoriesRoute.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle)

categoriesRoute.get("/", listCategoriesController.handle)

categoriesRoute.post(
  "/import",
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
)

export { categoriesRoute }