import * as dotenv from 'dotenv'
dotenv.config()

import { CosmosClient } from '@azure/cosmos'
import { runPingService } from './services/pingService'

const cosmosClient = new CosmosClient(process.env.COSMOS_CONNECTION_STRING as string)

const main = async () => {
    
    runPingService()

}

main()