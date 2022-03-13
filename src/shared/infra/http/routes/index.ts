import { Router } from "express";

import { specificationRoutes } from './specifications.routes'
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoute } from './categories.routes'
import { usersRoutes } from './users.routes'
import { carsRoutes } from './cars.routes'
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";


const router = Router()

router.use("/categories", categoriesRoute)
router.use("/specifications", specificationRoutes)
router.use("/users", usersRoutes)
router.use("/cars", carsRoutes)
router.use("/rentals", rentalRoutes)
router.use("/password", passwordRoutes)
router.use(authenticateRoutes)

export { router }