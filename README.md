# `wanted-pre-onboarding-frontend 사전과제`

원티드 프리온보딩 프론트엔드 - 선발 과제


### 지원자 성명: 김희연


## `프로젝트 실행 방법`

```bash
git clone https://github.com/patataco/wanted-pre-onboarding-frontend.git
cd wanted-pre-onboarding-frontend
npm install
npm start
```

## 데모 영상

Vercel을 통해 배포. [DEMO](https://wanted-pre-onboarding-frontend-nu-fawn.vercel.app)

## `language & libraries`

* Typescript
* Tailwind CSS
* React Router(react-router-dom)
* Axios

## `구조`

```
📦src
 ┣ 📂apis
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜todo.ts
 ┣ 📂components
 ┃ ┣ 📂todo
 ┃ ┃ ┣ 📜EditTodoItem.tsx
 ┃ ┃ ┣ 📜EmptyTodoList.tsx
 ┃ ┃ ┣ 📜TodoInput.tsx
 ┃ ┃ ┣ 📜TodoItem.tsx
 ┃ ┃ ┣ 📜TodoItemContainer.tsx
 ┃ ┃ ┣ 📜TodoListContainer.tsx
 ┃ ┃ ┗ 📜TodoListItems.tsx
 ┃ ┣ 📜Button.tsx
 ┃ ┣ 📜Checkbox.tsx
 ┃ ┗ 📜Input.tsx
 ┣ 📂context
 ┃ ┣ 📜TodosProvider.tsx 
 ┃ ┗ 📜authProvider.tsx 
 ┣ 📂guards
 ┃ ┣ 📜auth-guard.tsx
 ┃ ┗ 📜guest-guard.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useAuthContext.ts 
 ┃ ┣ 📜useRouter.ts
 ┃ ┣ 📜useTodoInput.ts
 ┃ ┗ 📜useTodos.ts 
 ┣ 📂pages
 ┃ ┣ 📜Signin.tsx
 ┃ ┣ 📜Signup.tsx
 ┃ ┗ 📜Todo.tsx
 ┣ 📂routes
 ┃ ┣ 📜auth.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜paths.ts
 ┃ ┗ 📜todo.tsx
 ┣ 📂type
 ┃ ┗ 📜type.ts
 ┣ 📂utils
 ┃ ┣ 📜axios.ts
 ┃ ┗ 📜utils.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜index.tsx

```

## `설계 및 구현 설명`

## Auth

### 설계 및 개발 방향
사용자의 로그인 상태를 전역적으로 관리하고, 적절한 페이지 접근 권한을 부여하는 것이 주요 목표였습니다.

* `Context API의 선택 이유`
  * 상태의 전역적 관리: 여러 컴포넌트에서 접근 가능한 상태를 제공하여 인증 정보를 효율적으로 관리할 수 있습니다.
  * 코드 재사용 및 캡슐화: 인증 관련 로직을 AuthProvider 내부에 캡슐화하므로써 중복을 제거하고 코드의 재사용성을 높였습니다.

* `Guard 컴포넌트의 도입`
  * AuthGuard: 사용자의 로그인 상태에 따라 적절한 페이지 접근 권한을 부여합니다. 로그인되지 않은 사용자는 로그인 페이지로 리다이렉션하며 이 과정에서 리다이렉션 전의 페이지 정보를 저장하여 로그인 후 원래의 페이지로 돌아올 수 있게 합니다.
  * GuestGuard: 이미 로그인된 사용자의 로그인 페이지나 회원가입 페이지 접근을 방지하여 불필요한 로그인 절차를 최소화합니다.

### 주요 구성 및 동작

* `AuthProvider (src/context/AuthProvider.tsx)`
  * 상태 관리: isAuthenticated를 통해 사용자의 인증 상태를 파악하며, loading과 isInitialized 상태로 인증 처리 및 컴포넌트 초기화 상태를 판단합니다.
  * token 관리: 로컬 스토리지에 저장된 access_token을 활용하여 사용자의 로그인 상태를 초기화하거나 업데이트합니다.
  * 인증 함수 제공: login 및 register 함수로 로그인 및 회원가입 기능을 제공합니다.
    
* `AuthGuard (src/guards/auth-guard.tsx)`
  * 로그인 상태 확인: 사용자가 로그인 되지 않았을 때 로그인 페이지로 리다이렉션합니다.

* `GuestGuard (src/guards/guest-guard.tsx)`
  * 로그인된 사용자의 특정 페이지 접근 방지: 로그인된 사용자가 로그인 페이지나 회원가입 페이지에 접근하는 것을 방지합니다.
 
* `utils (src/utils/utils.ts)`
  * 다양한 유틸리티 기능 제공: 토큰 처리, 입력값 검증 등의 기능을 제공하여 프로젝트의 다른 부분에서 재사용 가능하게 합니다.


## TodoList

### 설계 및 개발 방향
사용자의 Todos를 효율적으로 관리하며, 서버와의 연동을 통해 실시간으로 Todos의 상태를 반영하는 것이 주요 목표였습니다.

* `Context API의 선택 이유`
  * 상태의 전역적 관리: Todos 상태와 관련된 동작들을 전역적으로 관리하고 제공하므로 여러 컴포넌트에서 쉽게 Todos 데이터를 가져오거나 변경할 수 있습니다.
  * 비즈니스 로직의 분리와 캡슐화: Todos와 관련된 로직을 TodosProvider에서 관리함으로써 관심사의 분리를 실현하고, 코드의 가독성 및 유지보수성을 향상시켰습니다.

* `API 연동`
  * 서버와의 통신을 통해 Todos의 CRUD 연산을 반영하며, 이를 TodosProvider에서 관리하여 실시간으로 UI에 반영되도록 구현하였습니다.

### 주요 구성 및 동작

* `TodosProvider (src/context/TodosProvider.tsx)`
  * 상태 관리: todos를 사용하여 할 일 목록의 상태를 관리하며, setTodos로 상태를 업데이트합니다.
  * API 연동: 백엔드와 통신하여 할 일 목록 데이터를 가져오거나 업데이트합니다.
    
* `Router (src/routes/index.tsx)`
  * 라우팅 설정: 프로젝트의 주요 라우팅 구조를 정의하며, 기본 경로에 접속할 경우 할 일 목록 페이지로 리다이렉션합니다.





