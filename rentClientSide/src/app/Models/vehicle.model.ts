export class Vehicle {
    
    public constructor(

        public VehicleTypeID?: number,
        public Manufacturer?: string,
        public Model?: string,
        public DayCost?: number,
        public LateDayCost?: number,
        public ModelYear?: number,
        public Gear?: string,
        public Class?: number,
        public VehicleImage?: string
    ){}
}