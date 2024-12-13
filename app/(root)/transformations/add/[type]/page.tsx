import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import Head from 'next/head';
import { redirect } from 'next/navigation';
import React from 'react'
// Metadata function to set dynamically
export async function generateMetadata({ params: { type } }: { params: { type: string } }): Promise<Metadata> {
    const transformation = transformationTypes[type];

    if (!transformation) {
        return {
            title: 'Invalid Transformation Type',
            description: 'The specified transformation type does not exist.',
        };
    }

    return {
        title: `Visualise AI || ${transformation.title}`,
        description: transformation.subTitle,
    };
}
const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
    const transformation = transformationTypes[type];
    const { userId } = await auth()
    console.log(userId);

    if (!userId) redirect('/sign-in')

    const user = await getUserById(userId);
    return (<>

        <Header
            title={transformation.title}
            subtitle={transformation.subTitle}
        />
        <section>
            <TransformationForm
                action="Add"
                userId={user._id}
                type={transformation.type as TransformationTypeKey}
                creditBalance={user.creditBalance}
            />
        </section>
    </>

    )
}

export default AddTransformationTypePage;