'use client'
import { useContext, useEffect, useState } from "react";
import Card from "@/components/Card";
import { AppContext, AppContextFun } from './AppContext';
import dummydata from './data1';
import HomeL from "@/components/HomeL";

export default function Home() {
  const { state } = useContext(AppContext);
  const setState = useContext(AppContextFun);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  // useEffect(() => {
  //   // console.log('state',state)
  //   setData([]);

  //   function filters(data2) {
  //     // console.log('state',state)

  //     return data2.filter((a) => {
  //       console.log('title==', a.category.toLowerCase())
  //       console.log('state==', state.filters.Categories.toLowerCase())
  //       console.log(a.category.toLowerCase() === (state.filters.Categories.toLowerCase()))
  //       console.log(a.category.toLowerCase() === (state.searchInput.toLowerCase()))
  //       return a.category.toLowerCase() === (state.filters.Categories.toLowerCase())
  //     }

  //     );
  //     // console.log('fdata=', r)
  //     // return r
  //   }

  //   const filteredData = filters(dummydata);
  //   console.log('fdata=', filteredData)

  //   setData(filteredData);
  // }, [state.filters.Categories]);
  // useEffect(() => {
  //   // console.log('state',state)
  //   setData([]);

  //   function filters(data2) {
  //     // console.log('state',state)

  //     return data2.filter((a) => {
  //       console.log('title==', a.category.toLowerCase())
  //       console.log('state==', state.filters.Categories.toLowerCase())
  //       console.log(a.category.toLowerCase() === (state.filters.Categories.toLowerCase()))
  //       console.log(a.category.toLowerCase() === (state.searchInput.toLowerCase()))
  //       return a.category.toLowerCase() === (state.searchInput.toLowerCase())
  //     }

  //     );
  //     // console.log('fdata=', r)
  //     // return r
  //   }

  //   const filteredData = filters(dummydata);
  //   console.log('fdata=', filteredData)

  //   setData(filteredData);
  // }, [state.searchInput]);
  // useEffect(() => {
  //   // console.log('state',state)
  //   setData([]);

  //   function filters(data2) {
  //     // console.log('state',state)

  //     return data2.filter((a) => {
  //       console.log('price==',parseFloat(a.price))
  //       // console.log('statemax==', parseFloat(state.filters.price.max))
  //       console.log('statemin==', parseFloat(state.filters.price.min))

  //       console.log(a.price === (state.filters.price.min))
  //       // console.log(parseFloat(a.price) < (parseFloat(state.filters.price.max)))
  //       console.log (parseFloat(a.price) > (parseFloat(state.filters.price.min)))
  //       return parseFloat(a.price) > (parseFloat(state.filters.price.min)) 
  //     }

  //     );
  //     // console.log('fdata=', r)
  //     // return r
  //   }

  //   const filteredData = filters(dummydata);
  //   console.log('fdata=', filteredData)

  //   setData(filteredData);
  // }, [state.filters.price.min]);
  //  useEffect(() => {
  //   // console.log('state',state)
  //   setData([]);

  //   function filters(data2) {
  //     // console.log('state',state)

  //     return data2.filter((a) => {
  //       console.log('price==',parseFloat(a.price))
  //       // console.log('statemax==', parseFloat(state.filters.price.max))
  //       console.log('statemin==', parseFloat(state.filters.price.max))

  //       console.log(a.price < (state.filters.price.max))
  //       // console.log(parseFloat(a.price) < (parseFloat(state.filters.price.max)))
  //       console.log (parseFloat(a.price) > (parseFloat(state.filters.price.max)))
  //       return parseFloat(a.price) < (parseFloat(state.filters.price.max)) 
  //     }

  //     );

  //   }

  //   const filteredData = filters(dummydata);
  //   console.log('fdata=', filteredData)

  //   setData(filteredData);
  // }, [state.filters.price.max]);
  useEffect(() => {
    // console.log('state',state)
    setData([]);

    function filters(data2) {
      // console.log('state',state)

      return data2.filter((a) => {
        // console.log("no way")
        // console.log('price==',parseFloat(a.price))
        // // console.log('statemax==', parseFloat(state.filters.price.max))
        // console.log('statemin==', parseFloat(state.filters.price.max))

        // console.log(a.price < (state.filters.price.max))
        // // console.log(parseFloat(a.price) < (parseFloat(state.filters.price.max)))
        // console.log (parseFloat(a.price) > (parseFloat(state.filters.price.max)))
        var c = true
        var min = true
        var max = true
        var s = true
        var p = true
        // if(state.searchInput!=''){
        //   p = a.title.toLowerCase().includes(state.searchInput.toLowerCase())
        // console.log(a.category.toLowerCase())
        // console.log(state.searchInput.toLowerCase())
        // console.log(a.title.toLowerCase())
        //   console.log("p=",p)

        // }
        if (state.filters.Categories != "all") {
          c = a.category.toLowerCase() === (state.filters.Categories.toLowerCase())
        }
        if (state.filters.price.min) {
          min = parseFloat(a.price) > (parseFloat(state.filters.price.min))
        }
        if (state.filters.price.max) {
          max = parseFloat(a.price) < (parseFloat(state.filters.price.max))
        }
        if (state.filters.star) {
          s = parseFloat(a.rating.rate) >= (parseFloat(state.filters.star))
        }

        return c & min & max & s
      }

      );
      // console.log('fdata=', r)
      // return r
    }
    if (data2 != []) {
      var filteredData = filters(data2);

    } else {
      var filteredData = filters(dummydata);
    }
    // console.log('fdata=', filteredData)

    setData(filteredData);
  }, [state.filters]);
  useEffect(() => {
    // console.log('state',state)
    if (state.searchInput !== '') {
      setState((prevState) => ({
        ...prevState,
        top: 'top3' // or dynamically set this value based on searchBarRect.top
      }));
    }
    setData([]);
    setState(prevState => {
      // console.log({...prevState}); // Log the previous state
      return {
        ...prevState, // Spread the previous state
        filters: { Categories: "all", price: { min: null, max: null }, star: null }
      };
    });
    function filters(data2) {
      // console.log('state',state)

      return data2.filter((a) => {
        // console.log('price==',parseFloat(a.price))
        // // console.log('statemax==', parseFloat(state.filters.price.max))
        // console.log('statemin==', parseFloat(state.filters.price.max))

        // console.log(a.price < (state.filters.price.max))
        // // console.log(parseFloat(a.price) < (parseFloat(state.filters.price.max)))
        // console.log (parseFloat(a.price) > (parseFloat(state.filters.price.max)))

        var p = true
        if (state.searchInput != '') {

          p = a.category.toLowerCase() === (state.searchInput.toLowerCase()) || a.title.toLowerCase().includes(state.searchInput.toLowerCase())
          // console.log(a.category.toLowerCase())
          // console.log('inpu=', state.searchInput.toLowerCase())
          // console.log(a.title.toLowerCase())
          // console.log("p=", p)

        }


        return p
      }

      );
      // console.log('fdata=', r)
      // return r
    }

    const filteredData = filters(dummydata);
    // console.log('fdata=', filteredData)

    setData(filteredData);
    setData2(filteredData)
  }, [state.searchInput]);

  return (
    <main className="">
      {state.searchInput === '' ? <HomeL dummydata={dummydata}/> :
        <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  w-screen ">
          {data.length > 0 ? (
            data.map(data => (
              <Card key={data.id} data={data} />
            ))
          ) : (
            <p>No results found</p>
          )}

        </div>}
    </main>
  );
}
