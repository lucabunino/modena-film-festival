import { CalendarIcon, NumberIcon, SparkleIcon } from '@sanity/icons'

export default {
    name: 'program',
    type: 'document',
    icon: CalendarIcon,
    fields: [
        {
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'edition',
            type: 'number',
            validation: (Rule) => Rule.required(),
        },
		{
			name: 'status',
			type: 'string',
			options: {
				list: [
					{ title: 'Public', value: 'public' },
					{ title: 'Hidden', value: 'hidden' },
				],
				layout: 'radio'
			},
			initialValue: 'public',
		},
        {
            name: 'days',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'day',
                    icon: NumberIcon,
                    fields: [
                        {
                            name: 'date',
                            type: 'date',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'events',
                            type: 'array',
                            of: [
                                {
                                    type: 'reference',
                                    to: [{ type: 'event' }],
                                    icon: SparkleIcon,
                                },
                            ],
                            validation: (Rule) => Rule.required(),
                        },
                    ],
                    preview: {
                        select: {
                            date: 'date',
                            events: 'events'
                        },
                        prepare({ date, events }) {
                            const count = events ? events.length : 0;
                            let title = 'Data non definita';

                            if (date) {
                                const d = new Date(date);
                                const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
                                const dayName = days[d.getDay()];
                                const dayNum = d.getDate();
                                const monthNum = d.getMonth() + 1;
                                title = `${dayName} ${dayNum}.${monthNum}`;
                            }

                            return {
                                title: title,
                                subtitle: `${count} ${count === 1 ? 'evento' : 'eventi'} in programma`,
                                media: NumberIcon
                            };
                        }
                    }
                },
            ],
        },
    ],
};