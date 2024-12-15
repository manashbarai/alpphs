import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/skillsReducer'
import { getCurrentMonth, getCurrentDay } from "../util/getCurrentMOnth";
const AppContext = createContext();

const lotteryApi='https://shillongteerresults.app/public/api/';

const initialState = {
    isLoading: false,
    isError: false,
    shillongs: {},
    shillong: [],

    khanaparas: {},
    khanapara: [],
    juwais: {},
    juwai: [],
    nights:{},
    night: [],
    bhutans:{},
    bhutan: [],
    bhutanTeers:{},
    bhutanTeer: [],
    clubChartForSillong:[],
    sillongCommonNumber:{},
    buthanCommonNumber:{},
    state: [],
    blogPosts: [],
    result_Month: [],
    result_day: [],
    createdUser: {
        page: "",
        total: "",
        pages: "",
        users: []
    }


}
const AppProvider = ({ children }) => {



    const [state, dispatch] = useReducer(reducer, initialState)


    // const getResultDayAccording = async (url, state) => {
    //     dispatch({ type: "LOADING" })
    //     const ids = state.map(({ id }) => Number(id));

    //     try {
    //         const result = await axios.post(url, { ids })
    //         dispatch({ type: "DAY_RESULT", payload: result.data })
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

    const getBlogPost = useCallback(async (BLOG_POST) => {
        dispatch({ type: "LOADING" });
        try {
            const res = await axios.get(BLOG_POST);
            const blog_post = await res.data;

            dispatch({ type: "BLOG_POST", payload: blog_post });
        } catch (error) {
            dispatch({ type: "API_ERROR" });
        }
    }, []);

    const getCreatedUser = async (url) => {
        dispatch({ type: "LOADING" })
        try {
            const leadsLimit = await axios.get(url)


            dispatch({ type: "CREATED_USER", payload: leadsLimit.data })
        } catch (error) {
            dispatch({ type: "API_ERROR" });

        }
    }

    // const getState = async (url) => {
    //     dispatch({ type: "LOADING" })

    //     try {
    //         const state = await axios.get(url)
    //         dispatch({ type: "STATE", payload: state.data })

    //         if (state.status === 200) {
    //             getResultDayAccording(`${process.env.REACT_APP_API_URL}api/result/month/day/2024/${currentMonth}/${currentDay}`, state.data)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // const getResultMonthAccording = async (url) => {
    //     dispatch({ type: "LOADING" })
    //     try {
    //         const result = await axios.get(url)
    //         dispatch({ type: "MONTH_RESULT", payload: result.data })
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }
    const getLoteryResult = async (url, type) => {
        dispatch({ type: 'LOADING' })
        try {
            const result = await axios.get(url)


            if (result.status === 200) {
                dispatch({ type: type, payload: result.data })
            }
        } catch (error) {
            dispatch({ type: "API_ERROR" });
            
        }

    }
    const getCommonNumber=async(url,type)=>{
        dispatch({ type: 'LOADING' })
        try {
            const result = await axios.get(url)


            if (result.status === 200) {
                dispatch({ type: type, payload: result.data })
            }
        } catch (error) {
            dispatch({ type: "API_ERROR" });
            
        }
    }

    const updatedArray = (arry, type) => dispatch({ type: type, payload: arry })
    const updatedObject = (arry, type) => dispatch({ type: type, payload: arry })
    

    useEffect(() => {

       
        getLoteryResult(`${process.env.REACT_APP_API_URL}api/night`, 'NIGHTS')
        getLoteryResult(`${process.env.REACT_APP_API_URL}api/bhutan`, 'BHUTANS')
        getLoteryResult(`${process.env.REACT_APP_API_URL}api/bhutanTeer`, 'BHUTANTEERS')

        getLoteryResult(`${lotteryApi}shillong-results`, 'SILONG')
        getLoteryResult(`${lotteryApi}khanapara-results`, 'KHANPARA')
        getLoteryResult(`${lotteryApi}juwai-results`, 'JUWAI')
        getLoteryResult(`${lotteryApi}night-results`, 'NIGHT')
        getLoteryResult(`${lotteryApi}bhutan-morning-results`, 'BHUTAN')
        getLoteryResult(`${lotteryApi}bhutan-teer-results`, 'BHUTANTEER')
        getLoteryResult(`${process.env.REACT_APP_API_URL}api/clubChart`, 'CLUBCHART')
        
        getCommonNumber(`https://shillongteerresults.app/public/api/common-main`,'SILLONGCOMMON')
        getCommonNumber(`https://shillongteerresults.app/public/api/bhautancommon-main`,'BHUTANCOMMON')
        
        getBlogPost(`${process.env.REACT_APP_API_URL}api/blog`)
        getCreatedUser(`${process.env.REACT_APP_API_URL}api/user/all?role=2&page=1&limit=10`)
        // getResultMonthAccording(`${process.env.REACT_APP_API_URL}api/result/month/2024/${currentMonth}`)



    }, [])





    return <AppContext.Provider value={{ ...state, updatedArray,updatedObject }}    >
        {children}
    </AppContext.Provider>

}


const useGlobalSkills = () => {
    return useContext(AppContext)
}


export { AppProvider, AppContext, useGlobalSkills }