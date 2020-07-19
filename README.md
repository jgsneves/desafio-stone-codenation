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
#### admin/
Nesta rota é possível utilizar o admin manager padrão do Django. Apenas um único superuser tem acesso a essa funcionalidade

#### users/
Listagem de todos os usuários da aplicação. Apenas para usuários autenticados. **Vale lembrar que a API exige que todas as request sejam feitas com um header de "Authentication".**

#### users/<int:pk>
Retorna apenas o user com id===pk (route param).

#### users/register
Cadastro de um novo usuário, sendo necessário a passagem do seguinte body request:
```js
{
    "username": string,
    "email": email,
    "password": string,
    "password2": "confirmar password"
}
```
#### api-token-auth/
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
#### reports/
Retorna da lista de Reports

#### reports/<int:pk>
Retorna apenas o report de id === pk

#### reports/new
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


### 2) Front-end:

O

## :computer: Tecnologias empregadas:
- [Express](https://expressjs.com/);
- [Uuidv4 - gerador de hash aleatória](https://www.npmjs.com/package/uuidv4);
- [Node](https://nodejs.org/en/);
- [Nodemon](https://nodemon.io/);
- [TypeScript](https://www.typescriptlang.org/);

