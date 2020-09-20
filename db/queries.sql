/* done Получить список всех категорий
   (идентификатор, наименование категории); */
SELECT id    AS "Идентификатор",
       title AS "Наименование категории"
FROM categories;


/* Получить список категорий для которых создана
   минимум одна публикация
   (идентификатор, наименование категории); */
SELECT categories.id    AS "Идентификатор",
       categories.title AS "Наименование категории"
FROM categories_articles
       INNER JOIN categories on categories_articles.category_id = categories.id
GROUP BY categories.id
HAVING count(categories.id) > 0;


/* Получить список категорий с количеством публикаций
   (идентификатор, наименование категории,
    количество публикаций в категории); */
SELECT categories.id                          AS "Идентификатор",
       categories.title                       AS "Наименование категории",
       count(categories_articles.category_id) AS "Количество публикаций в категории"
FROM categories
       LEFT JOIN categories_articles ON categories_articles.category_id = categories.id
GROUP BY categories.id;


/* Получить список публикаций
   (идентификатор публикации, заголовок публикации,
    анонс публикации, дата публикации, имя и фамилия автора,
    контактный email, количество комментариев,
    наименование категорий). Сначала свежие публикации; */
SELECT articles.id                                    AS "идентификатор публикации",
       articles.title                                 AS "заголовок публикации",
       articles.announce                              AS "анонс публикации",
       articles.publication_date                      AS "дата публикации",
       concat(users.firstname, ' ', users.lastname)   AS "имя и фамилия автора",
       users.email                                    AS "контактный email",
       count(comments.article_id)                     AS "количество комментариев",
       (
         SELECT string_agg(categories.title, ', ') AS "наименование категорий"
         FROM categories_articles
                LEFT JOIN categories
                          ON categories_articles.category_id = categories.id
                            AND categories_articles.article_id = articles.id
       )
FROM articles
       INNER JOIN users
                  ON articles.user_id = users.id
       INNER JOIN comments
                  ON articles.id = comments.article_id
GROUP BY articles.id,
         articles.publication_date,
         users.firstname,
         users.lastname,
         users.email
ORDER BY articles.publication_date DESC;


/* Получить полную информацию определённой публикации
   (идентификатор публикации, заголовок публикации, анонс,
    полный текст публикации, дата публикации, путь к изображению,
    имя и фамилия автора, контактный email, количество комментариев,
    наименование категорий); */
SELECT articles.id                                    AS "идентификатор публикации",
       articles.title                                 AS "заголовок публикации",
       articles.announce                              AS "анонс",
       articles.full_text                             AS "полный текст публикации",
       articles.publication_date                      AS "дата публикации",
       articles.picture                               AS "путь к изображению",
       concat(users.firstname, ' ', users.lastname)   AS "имя и фамилия автора",
       users.email                                    AS "контактный email",
       count(comments.article_id)                     AS "Количество комментариев",
       (
         SELECT
           string_agg(categories.title, ', ')          AS "наименование категорий"
         FROM categories_articles
                LEFT JOIN categories ON categories_articles.category_id = categories.id
           AND categories_articles.article_id = articles.id
       )
FROM articles
       INNER JOIN users
                  ON articles.user_id = users.id
       INNER JOIN comments ON articles.id = comments.article_id
WHERE articles.id = 1
GROUP BY articles.id, users.firstname, users.lastname, users, email;


/* Получить список из 5 свежих комментариев
   (идентификатор комментария, идентификатор публикации,
    имя и фамилия автора, текст комментария); */
SELECT comments.id                                    AS "Идентификатор комментария",
       comments.article_id                            AS "Идентификатор публикации",
       concat(users.firstname, ' ', users.lastname)   AS "Имя и фамилия автора",
       comments.text                                  AS "Текст комментария"
FROM comments
       INNER JOIN users
                  ON comments.user_id = users.id
ORDER BY publication_date DESC
LIMIT 5;


/* Получить список комментариев для определённой публикации
   (идентификатор комментария, идентификатор публикации,
    имя и фамилия автора, текст комментария).
    Сначала новые комментарии; */
SELECT comments.id                                    AS "Идентификатор комментария",
       comments.article_id                            AS "Идентификатор публикации",
       concat(users.firstname, ' ', users.lastname)   AS "Имя и фамилия автора",
       comments.text                                  AS "Текст комментария"
FROM comments
       INNER JOIN users
                  ON comments.user_id = users.id
WHERE article_id = 3
ORDER BY publication_date DESC;


/* Обновить заголовок определённой публикации на
   «Как я встретил Новый год»; */
UPDATE articles
set title = 'Как я встретил Новый год'
WHERE articles.id = 1;
