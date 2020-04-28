import { Ref } from '@vue/composition-api';
import { action } from '@/types/index'

function addMonth(state: Ref<number[]>) {
    const _var = state.value.map(Number)
    const numMonth = _var[1];
    if (numMonth + 1 > 12) {
        _var[0]++
        _var[1] = 1
        state.value = _var
    } else {
        _var[1]++
        state.value = _var
    }
}

function cutMonth(state: Ref<number[]>) {
    const _var = state.value.map(Number)
    const numMonth = _var[1];
    if (numMonth - 1 === 0) {
        _var[0]--
        _var[1] = 12
        state.value = _var
    } else {
        _var[1]--
        state.value = _var
    }
}

export const useReducerDate = (state: Ref<number[]>) => {
    return function (action: action) {
        switch(action.type) {
            case 'preYear': {
                const _var = state.value.map(Number)
                _var[0] = _var[0] - 1;
                state.value = _var
                break;
            }
            case 'preMonth': {
                cutMonth(state);
                break;
            } 
            case 'nextYear': {
                const _var = state.value.map(Number)
                _var[0] = _var[0] + 1;
                state.value = _var
                break;
            }
            case 'nextMonth': {
                addMonth(state);
                break;
            } 
            default: {
                state.value = new Date().toLocaleDateString().split('/').map(Number)
            }
                
        }
    }
}
