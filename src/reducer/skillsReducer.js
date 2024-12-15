const SkillLists = (state, action) => {

    switch (action.type) {
        case 'LOADING':

            return {
                ...state,
                isLoading: true
            }

        case 'CREATED_USER':

            const { page,total,pages, users, } = action.payload

            return {
                ...state,
                isLoading: false,
                createdUser: {page: page,total: total,pages: pages, users: users}
            }

            case 'STATE':

            return {
                ...state,
                isLoading: false,
                state: action.payload
            }
            case 'SILONGS':

            return {
                ...state,
                isLoading: false,
                shillongs: action.payload
            }
            case 'SILONG':

            return {
                ...state,
                isLoading: false,
                shillong: action.payload
            }
            case 'KHANPARAS':

            return {
                ...state,
                isLoading: false,
                khanaparas: action.payload
            }
            case 'KHANPARA':

            return {
                ...state,
                isLoading: false,
                khanapara: action.payload
            }
            case 'JUWAIS':

            return {
                ...state,
                isLoading: false,
                juwais: action.payload
            }
            case 'JUWAI':

            return {
                ...state,
                isLoading: false,
                juwai: action.payload
            }
            case 'NIGHTS':

            return {
                ...state,
                isLoading: false,
                nights: action.payload
            }
            case 'NIGHT':

            return {
                ...state,
                isLoading: false,
                night: action.payload
            }
            case 'BHUTANS':

            return {
                ...state,
                isLoading: false,
                bhutans: action.payload
            }
            case 'BHUTAN':

            return {
                ...state,
                isLoading: false,
                bhutan: action.payload
            }

            case 'BHUTANTEERS':

            return {
                ...state,
                isLoading: false,
                bhutanTeers: action.payload
            }
            case 'BHUTANTEER':

            return {
                ...state,
                isLoading: false,
                bhutanTeer: action.payload
            }
            case 'SILLONGCOMMON':

            return {
                ...state,
                isLoading: false,
                sillongCommonNumber: action.payload
            }
            case 'BHUTANCOMMON':

            return {
                ...state,
                isLoading: false,
                buthanCommonNumber: action.payload
            }



            case 'DAY_RESULT':
            
            
            return {
                ...state,
                isLoading: false,
                result_day: action.payload
            }
            case 'MONTH_RESULT':
            return {
                ...state,
                isLoading: false,
                result_Month: action.payload
            }
            
            case 'UPDATE_USER':

           

            return {
                ...state,
                isLoading: false,
                createdUser: {  ...state.createdUser,users: action.payload}
            }
            case 'BLOG_POST':


            return {
                ...state,
                isLoading: false,
                blogPosts: action.payload,
                
            }
            case 'CLUBCHART':


            return {
                ...state,
                isLoading: false,
                clubChartForSillong: action.payload,
                
            }


        default:
            return state;
    }


    return state;



}


export default SkillLists;