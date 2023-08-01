# `wanted-pre-onboarding-frontend 사전과제`

원티드 프리온보딩 프론트엔드 - 선발 과제

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

## `주요 파일과 구현 설명`

### src/routes/index.tsx

* `Router`: 프로젝트의 주요 라우팅 구조를 정의합니다. 기본 경로(`/`)에 접근할 경우 할 일 목록 페이지로 자동 리디렉션됩니다.

* `authRoutes`: 인증과 관련된 라우트입니다. 로그인 및 회원가입 페이지를 포함하고 있으며, `GuestGuard`를 통해 이미 로그인된 사용자가 이 페이지들에 접근하는 것을 방지합니다.

* `todoRoutes`: 할 일 목록과 관련된 라우트입니다. `AuthGuard`를 통해 로그인되지 않은 사용자의 접근을 제한하며, `TodosProvider`를 사용하여 관련 상태와 동작들을 제공합니다.

이 구조를 통해 사용자 인증과 할 일 관리의 기능이 나뉘어져 있으며, 각각의 경로에 따라 적절한 페이지와 상태를 제공합니다.

--------

### src/guards/auth-guard.tsx

* `AuthGuard`: 로그인 상태를 확인하는 가드 컴포넌트입니다. 사용자가 로그인되지 않았을 경우 현재의 위치를 저장하고 로그인 페이지로 리다이렉션합니다. 로그인된 사용자는 원래의 경로나 페이지에 그대로 머물게 됩니다.

--------

### src/guards/guest-guard.tsx

* `GuestGuard`: 로그인된 사용자가 특정 페이지(예: 로그인 페이지나 회원가입 페이지)에 접근하는 것을 방지하는 가드 컴포넌트입니다. 로그인된 사용자가 이 페이지에 접근할 경우 지정된 경로(`returnTo` 또는 `/todo` 페이지)로 리디렉션됩니다.

--------

### src/context/AuthProvider.tsx

1. 상태 관리:
   * `isAuthenticated` 를 통해 사용자의 인증 상태를 관리합니다.
   * `loading` 상태를 통해 인증 상태의 로딩 여부를 판단합니다.
   * `isInitialized` 를 통해 컴포넌트 초기화가 완료되었는지 판단합니다.
     
2. 토큰 관리: 로컬 스토리지에 `access_token` 으로 저장된 토큰을 기반으로 사용자의 로그인 상태를 초기화하거나 업데이트합니다.

3. 인증 함수 제공: `login` 및 `register` 함수를 통해 로그인 및 회원가입 기능을 제공하며, 이에 따라 인증 상태를 업데이트합니다.

4. Context 제공: `AuthContext.Provider` 를 사용하여 인증 상태 및 관련 함수들을 하위 컴포넌트에 제공합니다.

--------

### src/context/TodosProvider.tsx

1. 상태 관리:
   * `todos` 를 사용하여 할 일 목록의 상태를 관리합니다.
   * `setTodos` 함수를 통해 해당 상태를 업데이트할 수 있습니다.

2. API 연결: createTodo, deleteTodo, getTodos, updateTodo 등의 API 함수들을 이용해 백엔드와 통신하며  TodoList 데이터를 가져오거나 업데이트합니다.

3. Context 제공: `TodosContext.Provider` 를 사용하여 Todo 목록 상태 및 관련 함수들을 하위 컴포넌트에 제공합니다.

--------

### src/hooks/useAuthContext.ts

토큰 관련 처리, 입력값 검증 등의 여러 유틸리티 기능을 제공하여 프로젝트의 다른 부분에서 재사용될 수 있도록 도와줍니다.

* jwtDecode(token: string)
  - 기능: `JWT`을 디코드하여 내용을 추출합니다.
  - parameter: 디코드할 JWT 문자열

* isValidToken(accessToken: string)
  - 기능: 주어진 엑세스 토큰이 유효한지 검사합니다. 토큰의 유효 시간이 현재 시간보다 이후라면 유효한 것으로 판단합니다.
  - parameter: 검사할 accessToken
    
* tokenExpired(exp: number)
  - 기능: 토큰의 만료 시간을 받아, 해당 시간에 토큰이 만료되면 사용자에게 알림을 보냅니다.
  - parameter: 토큰의 만료 시간 (초 단위)

* setLocalStorage(accessToken: string | null)
  - 기능: 주어진 엑세스 토큰을 로컬 스토리지에 저장하거나 제거합니다. 토큰이 주어지면 저장하고, 그렇지 않으면 제거합니다.
  - parameter: 저장하거나 제거할 엑세스 토큰.

* validateEmail(email: string)
  - 기능: 주어진 이메일 주소가 유효한 형식인지 검사합니다.
  - parameter: 검사할 이메일 주소

* validatePassword(password: string)
  - 기능: 주어진 비밀번호가 유효한 조건을 만족하는지 확인합니다. 여기서는 길이가 8 이상인지만 검사하고 있습니다.
  - parameter: 검사할 비밀번호

