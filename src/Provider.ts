/* eslint-disable prettier/prettier */
import axios, { AxiosError } from "axios";
export class Provider {
  private baseUrl: string;
  private response: {
    data: unknown | undefined
    error?: AxiosError;
  }

  public constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || 'http://city.indexer.blockcore.net';
    this.response = { data: undefined }
  }
  protected async executeGet<AxiosResponse>(endpoint: string): Promise<AxiosResponse | undefined> {
    await axios.get(endpoint)
      .then((res) => {
        this.response = {
          data: res.data,
          error: undefined
        }
      })
      .catch((error) => {
        this.response.error = error
      })

    return this.response as unknown as AxiosResponse;
  }

  public getSupply<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(this.baseUrl + "/api/insight/supply")
  }

  public async getCirculatingSupply<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(this.baseUrl + "/api/insight/supply/circulating");
  }

  public async getTotalSupply<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(this.baseUrl + "/api/insight/supply/total");
  }

  public async getEstimateRewards<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(this.baseUrl + "/api/insight/rewards");
  }
  public async getWallets<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(this.baseUrl + "/api/insight/wallets");
  }

  public async getRichList<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(this.baseUrl + "/api/insight/richlist");
  }

  public async getAddress<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/address/${address}`);
  }

  public async getAddressTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/address/${address}/transactions`);
  }

  public async getAddressUnconfirmedTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/address/${address}/transactions/unconfirmed`);
  }

  public async getAddressSpentTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/address/${address}/transactions/spent`);
  }

  public async getAddressUnspentTransactions<AxiosResponse>(address: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/address/${address}/transactions/unspent`);
  }

  public async getMempoolTransactions<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/mempool/transactions`);
  }

  public async getMempoolTransactionsCount<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/mempool/transactions/count`);
  }

  public async getTransactionById<AxiosResponse>(id: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/transaction/${id}`);
  }

  public async getBlock<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/block`);
  }

  public async getBlockTransactionsByHash<AxiosResponse>(hash: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/block/${hash}/transactions`);
  }

  public async getBlockByHash<AxiosResponse>(hash: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/block/${hash}`);
  }

  public async getBlockByIndex<AxiosResponse>(index: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/block/index/${index}`);
  }

  public async getBlockTransactionsByIndex<AxiosResponse>(index: string): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/block/index/${index}/transactions`);
  }

  public async getLatestBlock<AxiosResponse>(): Promise<AxiosResponse | undefined> {
    return this.executeGet(`${this.baseUrl}/api/query/block/latest`);
  }
}
