import React from 'react';

import PostAuthor from '../components/PostAuthor';
import { Link } from 'react-router-dom';

import Thumbnail from '../images/blog22.jpg';

const PostDetail = () => {
    return (
        <section className='post-detail'>
            <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor />
                    <div className="post-detail__buttons">
                        <Link to={`/posts/werwer/edit`} className='btn sm primary'>
                            Edit
                        </Link>
                        <Link to={`/posts/werwer/delete`} className='btn sm danger'>
                            Delete
                        </Link>
                    </div>
                </div>

                <h1>This is the post title.</h1>

                <div className="post-detail__thumbnail">
                    <img src={Thumbnail} alt="post" />
                </div>

                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
                    sint sequi quasi laborum laudantium numquam, temporibus delectus
                    soluta? Rem sed provident dolores voluptatum delectus, iste consequatur
                    aperiam similique pariatur, placeat vitae, illo expedita nemo! Incidunt
                    maiores exercitationem ducimus facilis velit.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores soluta
                    ut incidunt dignissimos itaque. Repudiandae, eveniet? Velit, eligendi
                    excepturi. Quod ex deserunt doloribus reprehenderit dicta obcaecati
                    eligendi voluptatum repudiandae accusamus nihil, maxime aliquam,
                    necessitatibus excepturi, quos temporibus laborum neque laboriosam natus!
                    In debitis doloribus eum eaque tempora rem, maxime dignissimos quos labore
                    sequi est tempore.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                    magni possimus, hic architecto doloremque exercitationem.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatibus
                    eaque nisi eum dolores! Impedit tenetur praesentium repellat culpa ad dolores
                    reprehenderit ipsam itaque! Quae exercitationem numquam, doloribus autem
                    similique perferendis dolor officia iusto quis sequi unde ipsa aperiam?
                    Exercitationem error deserunt et eius dolore quos tempora cumque dicta aliquam
                    autem magnam cupiditate repudiandae molestias placeat nemo sit corporis saepe
                    libero praesentium sed commodi, natus dolorum? Enim qui, accusamus cupiditate
                    nam unde nulla iure quam porro tenetur similique ipsum quaerat corporis magni
                    impedit magnam exercitationem. In pariatur consequuntur saepe, nemo ullam
                    quaerat sint mollitia, hic voluptatibus nam quod? Dicta esse earum itaque
                    corrupti distinctio! Et illo nostrum a voluptate, tempore enim saepe hic rerum
                    magnam vel sed ea placeat consequatur quia maxime temporibus itaque cupiditate
                    assumenda! Cumque, necessitatibus? Ipsa recusandae aspernatur quod in.
                    Asperiores error ipsa facere repellat laborum tenetur voluptatibus eum cupiditate
                    quam, earum inventore sequi? Reprehenderit quas provident id a animi voluptatum
                    excepturi alias, at quod illum. Earum nemo autem voluptatum delectus totam!
                    Facere doloremque a, sunt fugit sequi odio qui veritatis vero laboriosam quas
                    quidem iste nesciunt eligendi assumenda maxime consequuntur, aspernatur vel
                    itaque. Sint, impedit. Voluptatum atque itaque totam voluptatem quisquam iste,
                    sint ut officiis suscipit.
                </p>
            </div>
        </section>
    );
};

export default PostDetail;
