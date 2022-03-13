import { getRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';


class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }

  async create({
    name,
    category_id,
    daily_rate,
    description,
    fine_amount,
    brand,
    license_plate,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      category_id,
      daily_rate,
      description,
      fine_amount,
      brand,
      license_plate,
      specifications,
      id
    })

    await this.repository.save(car)

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate })

    return car
  }

  async findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
    const carQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })

    if (brand) {
      carQuery.andWhere("c.brand = :brand", { brand })
    }

    if (name) {
      carQuery.andWhere("c.name = :name", { name })
    }

    if (category_id) {
      carQuery.andWhere("c.category_id = :category_id", { category_id })
    }

    const cars = await carQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne(id)
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute()
  }
}

export { CarsRepository }