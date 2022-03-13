import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Audi',
      category_id: "category id",
    })

    const cars = await listAvailableCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it("should be able to list all available car by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car 1',
      description: 'car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: "category id",
    })

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_brand'
    })

    expect(cars).toEqual([car])

  })

  it("should be able to list all available car by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car3',
      description: 'car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: "category id",
    })

    const cars = await listAvailableCarsUseCase.execute({
      name: 'car3'
    })

    expect(cars).toEqual([car])

  })

  it("should be able to list all available car by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car3',
      description: 'car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car_brand',
      category_id: "12345",
    })

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345'
    })

    expect(cars).toEqual([car])

  })
})