const data = [
    {
        _id: '65c22e4e6edb2ab97fdaa19e',
        rating: 4,
        review:
            'Great course! Short, sweet and to the point! If you have no knowledge of PWAs or ES6 I\'d recommend brushing up first. This course is not for the faint of heart. It\'s like 0 to 60 in no time. It\'s almost too concise and not everything is explained for newer devs. But take it anyway because it will stretch you! Thanks!',
        course: '65be7c6128d05ff326c2ccfe',
        __v: 0
    },
    {
        _id: '65c24fa827653602951f5928',
        rating: 3.5,
        review:
            'This course is complete, concise, and it will take you from zero to hero while explaining all of the concepts clearly and thoroughly. The Lab feature will get you started in no time, providing an amazing consistent and error-free environment to follow the course. I went from zero to managing my infrastructure reliably after this course. Highly recommended!!!',
        course: '65be7c6128d05ff326c2ccfe',
        __v: 0
    },
    {
        _id: '65c2511827653602951f59bf',
        rating: 4.5,
        review:
            'The course covers hands-on training. I think there should be a course that explains the behind the scene process of next js caching, routing, client & server component rendering concepts via diagram and animation.',
        course: '65be7c6128d05ff326c2ccfe',
        __v: 0
    }
]

data.sort((a,b) => b.rating - a.rating);
console.log(data);