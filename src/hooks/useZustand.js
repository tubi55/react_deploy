import { create } from 'zustand';

export const useZustandStore = create(set => ({
	IsModal: false,
	IsMenu: false,
	setModalOpen: () => set({ IsModal: true }),
	setModalClose: () => set({ IsModal: false }),
	setMenuClose: () => set({ IsMenu: false }),
	setMenuToggle: () => set(state => ({ IsMenu: !state.IsMenu }))
}));

/*
  미션 - 2시 35분까지 useZustand를 활용한 전역 상태관리 흐름 정리

  client side data를 zustand로 전역상태 관리하면 좋은점
  - 코드의 간결성 (기존 contextAPI 기반의 전역컨텍스트 생성, 리듀서함수 생성, action객체 관리등의 번잡스러운 작업 불필요)
  - Provider컴포넌트를 따로 생성해서 전역 컴포넌트를 wrapping처리할 필요 없음
  - contextAPI의 고질적인 문제점인 복수개의 전역상태값이 하나의 Provider로 전달될 경우 불필요한 컴포넌트의 재랜더링 이슈 발생하지 않음 (제일 중요)
  - zustand에서는 선택적 상태 구독을 통해 특정 컴포넌트에 특정 전역 상태값에만 반응하도록 처리 (불필요한 리랜더링 방지 가능)

  zustand 설치
  npm i zustand
*/
