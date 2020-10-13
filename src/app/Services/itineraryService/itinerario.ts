export interface IItinerario{
    id: number,
    name: string,
    description: string,
    startcity: string,
    startprovince: string,
    endcity: string,
    endprovince: string,

	startlatitude: number, 
    startlongitude: number,
    endlatitude: number, 
    endlongitude: number,
    track: string
}