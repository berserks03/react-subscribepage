import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import ProviderDataService from '../services/ProviderService';
import Pagination from "@material-ui/lab/Pagination";

interface Provider  {
  id: number;
  email: string;
  provider: string;
  selected: boolean;
  date: Date;
};

const convertTime = (time: Date) => {
  return new Date(time).toLocaleDateString().toString();
};

const Api = () => {
  const initialProviderState = {
    id: null,
    provider: "",
    email: "",
    selected: false
  };
  const [providers, setProviders] = useState<Provider[]>();
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>();
  const [currentProvider, setCurrentProvider] = useState(initialProviderState);
  const [options, setOptions] = useState('date');
  const [inputValue, setInputValue] = useState('');
  
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  
  const pageSizes = [5, 10, 15];

  const ref: MutableRefObject<{ providers: string[] }> = useRef({
    providers: [],
  });

  const getRequestParams = ( page: number, pageSize: number) => {
    let params: {[key: string]: number} = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  // fetching data
  const retrieveProviders = () => {
    const params = getRequestParams( page, pageSize);

    ProviderDataService.getAll(params).then((response) => {
      const { providers, totalPages } = response.data;

      setProviders(providers);
      setCount(totalPages);

      // setProviders(response.data);
      providers &&
        setFilteredProviders(
          providers.sort((a: { date: Date }, b: { date: Date }) =>
            a.date > b.date ? -1 : 1
          )
        );
    });
  }

  useEffect(retrieveProviders, [page, pageSize]);

  // searching by email
  const searchByEmail = () => {
    const searchValues = filteredProviders?.filter((item) => {
      if (item.email.includes(inputValue)) {
        return item;
      }
      return false;
    });
    inputValue && setFilteredProviders(searchValues);
    setInputValue('');
  };

  // getting all providers
  if (providers) {
    const allProviders = providers?.map((item) => item.provider);
    allProviders?.push('All');
    ref.current.providers = Array.from(new Set(allProviders));
  }

  // sorting data
  const sortData = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setOptions(value);

    if (!filteredProviders) {
      return;
    }
    if (value === 'email') {
      setFilteredProviders(
        filteredProviders.sort((a, b) => (a.email > b.email ? 1 : -1))
      );
    } else {
      setFilteredProviders(
        filteredProviders.sort((a, b) => (a.date > b.date ? 1 : -1))
      );
    }
  };

  // filter data by email providers
  const filterData = (prov: string) => {
    if (prov === 'All') {
      setFilteredProviders(providers);
    } else {
      const filtered = providers?.filter((item) => item.provider === prov);
      setFilteredProviders(filtered);
    }
  };

  // deleting email  provider by id
  const deleteEmail = (id: number) => {
    ProviderDataService.remove(id);
    const deleted = filteredProviders?.filter((item) => item.id !== id);
    setFilteredProviders(deleted);
  };

  if (!filteredProviders) {
    return <div>No data to show</div>;
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value:number) => {
    setPage(value);
  };

  const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPageSize(event.target.value as number);
    setPage(1);
  };

  const removeAllProviders = () => {
    ProviderDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        retrieveProviders();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getProvider = (id: number) => {
    ProviderDataService.get(id)
      .then(response => {
        setCurrentProvider(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateSelected = (status: boolean) => {
    const data = {
      id: currentProvider.id,
      provider: currentProvider.provider,
      email: currentProvider.email,
      selected: status
    };

    ProviderDataService.update(currentProvider.id, data)
      .then(response => {
        setCurrentProvider({ ...currentProvider, selected: status });
        console.log(response.data);
        retrieveProviders();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <section>
      <div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>

          <div>
            <h4>Filter by provider: </h4>
            {ref.current.providers.map((item) => {
              return (
                <button
                  type='button'
                  key={item}
                  onClick={() => filterData(item)}
                  className='ml-10'
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div>
            <h4>Search by:</h4>
            <input
              type='text'
              placeholder='email...'
              className='mb-50'
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
            <button
              className="ml-10"
              type="button"
              onClick={searchByEmail}
            >
              Search
            </button>
          </div>

          <div>
            <h4>Sort by:</h4>
            <select
              value={options}
              onChange={(event) => sortData(event)}
              className='mb-15'
            >
              <option value='date'>Date</option>
              <option value='email'>Email</option>
            </select>
          </div>

          <div className="mt-20" style={{display: 'flex', flexBasis: '100%', justifyContent: 'center'}}>
            {"Items per Page: "}
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <Pagination
            className="my-20"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
          
          <div style={{display: 'flex', flexBasis: '100%', justifyContent: 'center', textAlign: 'center'}}>
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>No</th>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Provider</th>
                  <th>Selected</th>
                  <th>Date</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {!filteredProviders[0] ? (
                  <tr>
                    <td colSpan={6}>Database is empty</td>
                  </tr>
                ) : (
                  filteredProviders.map(({ id, email, provider, selected, date }, i) => {
                    return (
                      <tr key={id}>
                        <td style={{ minWidth:'100px'}}>
                          {selected? (
                          <button type='button' onClick={()=>{getProvider(id);updateSelected(false)}}>
                            unselect
                          </button>
                          ):(
                            <button type='button' onClick={()=>{getProvider(id);updateSelected(true)}}>
                            select
                          </button>
                          )}
                        </td>
                        <td style={{ minWidth:'50px'}}>{i + 1}</td>
                        <td style={{ minWidth:'50px'}}>{id}</td>
                        <td style={{ minWidth:'200px'}}>{email}</td>
                        <td style={{ minWidth:'150px'}}>{provider}</td>
                        <td style={{ minWidth:'100px'}}>{selected? "Yes" : "No"}</td>
                        <td>{convertTime(date)}</td>
                        <td style={{ minWidth:'100px'}}>
                          <button type='button' onClick={() => deleteEmail(id)}>
                            x
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <button
          className="m-20"
          onClick={removeAllProviders}
        >
          Delete All
        </button>

        </div>
      </div>
    </section>
  );
};

export default Api;
