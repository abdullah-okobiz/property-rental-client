import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

const StepLayout: React.FC = () => {
    return (
        <div className="flex gap-8 h-full min-h-[400px]">

            <div className="flex-1 flex items-center">
                <div>
                    <h1 className="text-2xl font-semibold mb-2">
                        It’s easy to get started on Homzystay
                    </h1>
                    <p className="text-gray-600 max-w-md">
                        Just follow a few simple steps and your place will be ready to host guests in no time.
                    </p>
                </div>
            </div>

            <div className="flex-1">
                <h1 className="text-xl font-semibold mb-1">Prepare to Welcome Guests</h1>
                <p className="text-gray-500 text-sm mb-4">
                    A quick overview of how to publish your Homzystay listing.
                </p>

                <Steps
                    progressDot
                    current={2}
                    direction="vertical"
                    items={[
                        {
                            title: 'Tell us about your place',
                            description: 'Share some basic info, like where it is and how many guests can stay.',
                        },
                        {
                            title: 'Make it stand out',
                            description: 'Add 5 or more photos plus a title and description—we’ll help you out.',
                        },
                        {
                            title: 'Finish up and publish',
                            description: "Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.",
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export default StepLayout;
