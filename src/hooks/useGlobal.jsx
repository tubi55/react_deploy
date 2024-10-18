import { createContext, useContext, useReducer } from 'react';

const initState = { isMenu: false, isModal: false };
export const ACTIONS = { SET_MENU_TOGGLE: 'SET_MENU_TOGGLE', SET_MENU_CLOSE: 'SET_MENU_CLOSE', SET_MODAL_OPEN: 'SET_MODAL_OPEN', SET_MODAL_CLOSE: 'SET_MODAL_CLOSE' };

const reducer = (state, action) => {
	switch (action.type) {
		case ACTIONS.SET_MENU_TOGGLE:
			return { ...state, isMenu: !state.isMenu };
		case ACTIONS.SET_MENU_CLOSE:
			return { ...state, isMenu: false };
		case ACTIONS.SET_MODAL_OPEN:
			return { ...state, isModal: true };
		case ACTIONS.SET_MODAL_CLOSE:
			return { ...state, isModal: false };
		default:
			return state;
	}
};

const GlobalState = createContext();
const GlobalDispatch = createContext();

export const GlobalProvider = ({ children }) => {
	const [store, dispatch] = useReducer(reducer, initState);
	return (
		<GlobalState.Provider value={{ store }}>
			<GlobalDispatch.Provider value={{ dispatch }}>{children}</GlobalDispatch.Provider>
		</GlobalState.Provider>
	);
};

export const useGlobalState = () => {
	const context = useContext(GlobalState);
	if (!context) throw new Error('해당 훅은 GlobalStateProvider안쪽에서 호출되어야 합니다.');
	return context;
};

export const useGlobalDispatch = () => {
	const context = useContext(GlobalDispatch);
	if (!context) throw new Error('해당 훅은 GlobalDispatchProvider안쪽에서 호출되어야 합니다.');
	return context;
};

/*
	react fast refresh란?
	- 리액트 개발시에 특정 코드만 수정하면 전체컴포넌트가 자동으로 새로고침되면서 수정이 일어나지 않는 모든 컴포넌트들이 전부 재랜더링
	- 결과적으로 부분적인 사소한 코드 수정할때마다 모든 컴포넌트가 재호출되다보니 연산시간이 많이 거릴면서 개발시 불편함 발생 
	- 위와 같은 문제접을 보와하기 위해서 리액트는 자체적으로 fast refresh기능이 동작됨
	- 해당 기능은 특정 코드 수정시 수정된 코드가 반영되는 컴포넌트만 변형이사항이 업데이트되며 수정이 일어나지 않는 나머지 컴포넌트들은 불필요한 재랜더링 발생시키지 않음

	react fast refresh의 동작 조건
	- 해당 기능은 컴포넌트를 반환하는 함수가 export될때만 적용가능
	- 커스텀훅같은 컴포넌트가 아닌 고차함수형태의 기능 함수나 상수값이 export 될때는 적용되지 않음
	- 컴포넌트 반환함수가 export되더라도 내부에 고차함나 상수값이 같이 export 될때에도 적용되지 않음
*/
