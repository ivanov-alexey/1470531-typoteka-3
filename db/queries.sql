/* done Получить список всех категорий (идентификатор, наименование категории); */
SELECT id    AS "identifier",
       title AS "category_name"
FROM categories;


/* Получить список категорий для которых создана минимум одна публикация
   (идентификатор, наименование категории); */
SELECT c.id    AS "identifier",
       c.title AS "category_name"
FROM categories_articles AS ca
         INNER JOIN categories AS c on ca.category_id = c.id
GROUP BY c.id
HAVING count(c.id) > 0;


/* Получить список категорий с количеством публикаций (идентификатор,
   наименование категории, количество публикаций в категории); */
SELECT c.id                  AS "identifier",
       c.title               AS "category_name",
       count(ca.category_id) AS "amount_of_publications"
FROM categories AS c
         LEFT JOIN categories_articles AS ca ON ca.category_id = c.id
GROUP BY c.id;


/* Получить список публикаций (идентификатор публикации, заголовок публикации,
    анонс публикации, дата публикации, имя и фамилия автора, контактный email,
    количество комментариев, наименование категорий). Сначала свежие публикации; */
SELECT a.id                                 AS "publication_id",
       a.title                              AS "publication_title",
       a.announce                           AS "announcement",
       a.full_text                          AS "full_text",
       a.publication_date                   AS "publication_date",
       a.picture                            AS "img_path",
       concat(u.firstname, ' ', u.lastname) AS "author",
       u.email                              AS "email",
       count(com.article_id)                AS "amount_of_comments",
       (
           SELECT string_agg(c.title, ', ') AS "categories_name"
           FROM categories_articles AS ca
                    LEFT JOIN categories AS c ON ca.category_id = c.id
               AND ca.article_id = a.id
       )
FROM articles AS a
         INNER JOIN users AS u
                    ON a.user_id = u.id
         INNER JOIN comments AS com ON a.id = com.article_id
WHERE a.id = 1
GROUP BY a.id, u.firstname, u.lastname, u, email;


/* Получить полную информацию определённой публикации (идентификатор публикации,
    заголовок публикации, анонс, полный текст публикации, дата публикации,
    путь к изображению, имя и фамилия автора, контактный email,
    количество комментариев, наименование категорий); */
SELECT a.id                                 AS "publication_id",
       a.title                              AS "publication title",
       a.announce                           AS "announcement",
       a.full_text                          AS "full_text",
       a.publication_date                   AS "publication_date",
       concat(u.firstname, ' ', u.lastname) AS "author",
       u.email                              AS "email",
       count(com.article_id)                AS "amount_of_comments",
       (
           SELECT string_agg(c.title, ', ') AS "categories_name"
           FROM categories_articles AS ca
                    LEFT JOIN categories AS c
                              ON ca.category_id = c.id
                                  AND ca.article_id = a.id
       )
FROM articles AS a
         INNER JOIN users AS u
                    ON a.user_id = u.id
         INNER JOIN comments AS com
                    ON a.id = com.article_id
GROUP BY a.id,
         a.publication_date,
         u.firstname,
         u.lastname,
         u.email
ORDER BY a.publication_date DESC;


/* Получить список из 5 свежих комментариев (идентификатор комментария,
   идентификатор публикации, имя и фамилия автора, текст комментария); */
SELECT c.id                                 AS "comment_id",
       c.article_id                         AS "publication_id",
       concat(u.firstname, ' ', u.lastname) AS "author",
       c.text                               AS "comment_text"
FROM comments AS c
         INNER JOIN users AS u
                    ON c.user_id = u.id
ORDER BY publication_date DESC
LIMIT 5;


/* Получить список комментариев для определённой публикации (идентификатор комментария,
    идентификатор публикации, имя и фамилия автора, текст комментария).
    Сначала новые комментарии; */
SELECT c.id                                 AS "comment_id",
       c.article_id                         AS "publication_id",
       concat(u.firstname, ' ', u.lastname) AS "author",
       c.text                               AS "comment_text"
FROM comments AS c
         INNER JOIN users AS u
                    ON c.user_id = u.id
WHERE article_id = 3
ORDER BY publication_date DESC;


/* Обновить заголовок определённой публикации на «Как я встретил Новый год»; */
UPDATE articles
set title = 'Как я встретил Новый год'
WHERE articles.id = 1;
