<h1 align=center>
<img src="https://raw.githubusercontent.com/jgsneves/desafioCodenation/master/codenation.png" />
</h1>

# Projeto final do AceleraDev Python-Django da Codenation 

O AceleraDev é um programa de aceleração promovido pela Codenation em parceria com a Stone Pagamentos. Nesta aceleração especificamente, aprendemos a desenvolver uma RESTful API em Django. O objetivo do projeto final é criar uma RESTful API em que armazenasse em um banco de dados que contenha logs de erro de uma fictícia equipe de desenvolvimento, para controle dos bugs.

O front-end era opcional, mas como será visto ao longo deste repositório, eu desenvolvi o front-end em ReactJS.


## :memo: O que é este repo?

É uma aplicação completa: um back-end responsável por criar um banco de dados e que possui rotas de controle de usuários e também criação, edição, exclusão e busca de reports de erros, além de um front-end responsivo e pensado na concepção de SPA (single page application).

### 1) Back-end:

O back-end foi todo feito em Django, utilizando o framework "django rest framework". O banco de dados utilizado foi o padrão de aplicações Django: o sqlite3. Estão presentes as seguintes rotas:
```py
urlpatterns = [
    #admin routes
    path('admin/', admin.site.urls),

    #users routes
    path('users/', views.get_users, name='users_list'),
    path('users/<int:pk>', views.get_single_user, name='single_user'),
    path('users/register/', views.sign_up_user, name='register_user'),

    #login/auth route
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),

    #report routes
    path('reports/', views.ReportListView.as_view(), name='reports_list'),
        # OBS: endpoint 'reports/' accepts query param ?page=int or ?search=string 
    path('reports/<int:pk>', views.handle_single_report, name='single_report'),
    path('reports/new', views.new_report, name='create_report'),
]
```
#### 1.1) admin/
Nesta rota é possível utilizar o admin manager padrão do Django. Apenas um único superuser tem acesso a essa funcionalidade

#### 1.2) users/
Listagem de todos os usuários da aplicação. Apenas para usuários autenticados. **Vale lembrar que a API exige que todas as request sejam feitas com um header de "Authentication".**

#### 1.3) users/<int:pk>
Retorna apenas o user com id===pk (route param).

#### 1.4) users/register
Cadastro de um novo usuário, sendo necessário a passagem do seguinte body request:
```js
{
    "username": string,
    "email": email,
    "password": string,
    "password2": "confirmar password"
}
```
#### 1.5) api-token-auth/
Autenticação de usuário. Aqui o usuário fará login, enviando um POST com o seguinte body request:
```js
{
    "username": string,
    "password": string,
}
```
Se os dados contidos na requisição forem idênticos aos contidos no banco de dados, haverá um retorno de hash de autenticação
```js
{
    "hash": "duiashasuidha873t4q634twjhdvgwaet67egwaje",
{
```
Este hash deverá ser inserido dentro do header de cada requisição, da seguinte forma:
```js
{
    header:
        { 
            Authorization: "Token 129dhausihde187gewugyeu1"
        }
}
```
#### 1.6) reports/
Retorna da lista de Reports

#### 1.7) reports/<int:pk>
Retorna apenas o report de id === pk

#### 1.8) reports/new
Cria um novo report, que requer a adição do seguinte body request:
```js
{
    "log": "teste 5 log",
    "title": "teste 5 title",
    "details": "teste 5 detail: user id deve ser 4",
    "type_of": "WARNING",
    "count_of_events": 100
}
```
Importante ressaltar que o banco de dados da aplicação utiliza duas tabelas principais: Users e Reports. A tabela Users é a [tabela padrão do Django](https://docs.djangoproject.com/en/3.0/topics/auth/default/) enquanto que a Reports foi criada através da seguinte model:
```py
class Report(models.Model):
    log             = models.CharField(max_length=25)
    title           = models.CharField(max_length=25)
    details         = models.TextField(max_length=100)
    type_of         = models.CharField(max_length=25, choices=type_choices)
    count_of_events = models.IntegerField()
    coleted_by      = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at      = models.DateTimeField(auto_now_add=True)
    archived        = models.BooleanField(default=False)
```

### 1.9) Instalação da aplicação:

Para instalar a aplicação, inicialmente você deve ativar a virtualenv do projeto, acessando a pasta 'venv':
```
.\Scripts\activate
```
Posteriormente, rode o seguinte comando:
```
python manage.py runserver
```

### 2) Front-end:

O front-end da aplicação foi feito todo em ReactJS, no molde de uma SPA e com responsividade de CSS
```
display: flex;
```

<h1 align=center>
<img width="500" src="https://github.com/jgsneves/desafioStoneCodenation/blob/master/2020-07-19-19-54-30.gif" />
</h1>

#### 2.1) Componentes:

##### 2.1.2) Header:
Exposição da marca da empresa, o hash de autenticação do usuário (quando logado), link para login/logout e link para os Reports

##### 2.1.3) Footer:
Exposição da marca, endereço e redes sociais com links reais.

#### 2.2) Pages:
Home e Reports, conforme explicado no header da aplicação.

#### 2.2) Instalação da aplicação:

Você precisa ter o npm e o yarn para instalar o node_modules. Após isto, basta executar o comando no diretório root:
```
yarn start
```

## :computer: Tecnologias empregadas:

Front-end:
- [Axios](https://github.com/axios/axios);
- [React](https://pt-br.reactjs.org/);
- [React Dom](https://reactjs.org/docs/react-dom.html);
- [React Icons](https://github.com/react-icons/react-icons);
- [TypeScript](https://www.typescriptlang.org/);

Back-end:
- asgiref==3.2.10
- astroid==2.4.2
- colorama==0.4.3
- Django==3.0.8
- django-cors-headers==3.4.0
- djangorestframework==3.11.0
- isort==4.3.21
- lazy-object-proxy==1.4.3
- mccabe==0.6.1
- pylint==2.5.3
- pylint-django==2.1.0
- pylint-plugin-utils==0.6
- pytz==2020.1
- six==1.15.0
- sqlparse==0.3.1
- toml==0.10.1
- wrapt==1.12.1

