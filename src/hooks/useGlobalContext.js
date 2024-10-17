import { createContext, useContext, useState } from 'react';

/*
  해당 파일에서 export할 요소 정리
  store - 라는 전역 상태값이 담길 공간 생성후 export
  Provider - store에 있는 정보값을 공유할수 있도록 루트 컴포넌트인 App에 전역 상태값을 전달해주는 Wrapping 컴포넌트
  전역 데이터 사용 커스텀훅 - 모든 컴포넌트에 전역에 등록된 상태값을 자유롭게 접근할 수 있도록 useContext를 활용한 커스텀훅 export
*/

//모든 자식 컴포넌트들이 사용할 전역 상태값이 담길 공간 생성
export const GlobalContext = createContext();

//해당 전역 실행 컨텍스트를 전달할 Wrapping 컴포넌트 생성
export function GlobalProvider({ children }) {
	const [ModalOpen, setModalOpen] = useState(false);
	return <GlobalContext.Provider value={{ ModalOpen, setModalOpen }}>{children}</GlobalContext.Provider>;
}

//위에서 전달하는 전역 상태값을 자식컴포넌트에서 가져오기 위한 실제적인 커스텀훅 생성
export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	return globalContext;
}
