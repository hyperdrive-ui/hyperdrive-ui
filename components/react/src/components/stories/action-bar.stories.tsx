import { Portal } from '@ark-ui/react'
import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
// import { css } from 'styled-system/css'
// import { ChevronDownIcon } from 'lucide-react'
import { ActionBar } from '~/components/ui/action-bar'
import { Button } from '~/components/ui/button'

const meta: Meta = {
  title: 'Components/ActionBar',
}

export default meta

export const Base = () => {
  
  const count = 5;
  const [isOpen, setOpen ] = useState(false)
  return (
    <Fragment>

        <Button onClick={() => setOpen(!isOpen)}>Toggle</Button>
        <ActionBar.Root 
            open={isOpen} 
            // onOpenChange={() => setShowActionBar(!showActionBar)} 
            // closeOnInteractOutside={false}
        >
          
            <Portal>
                <ActionBar.Positioner>
                    <ActionBar.Content>
                        <ActionBar.CloseTrigger />
                        <ActionBar.SelectionTrigger>{count} selected</ActionBar.SelectionTrigger>
                        <ActionBar.Separator />
                        
                            <Button variant="outline" size="sm" onClick={() => {}}>
                                Delete
                            </Button>
                       
                            <Button variant="outline" size="sm" onClick={() => {}}>
                                Share
                            </Button>
                    </ActionBar.Content>
                </ActionBar.Positioner>
            </Portal>
        </ActionBar.Root>
    </Fragment>
    // <Accordion.Root defaultValue={['React']}>
    //   {items.map((item) => (
    //     <Accordion.Item key={item} value={item} disabled={item === 'Svelte'}>
    //       <Accordion.ItemTrigger>
    //         {item}
    //         <Accordion.ItemIndicator>
    //           <ChevronDownIcon />
    //         </Accordion.ItemIndicator>
    //       </Accordion.ItemTrigger>
    //       <Accordion.ItemContent>
    //         Pudding donut gummies chupa chups oat cake marzipan biscuit tart. Dessert macaroon ice
    //         cream bonbon jelly. Jelly topping tiramisu halvah lollipop.
    //       </Accordion.ItemContent>
    //     </Accordion.Item>
    //   ))}
    // </Accordion.Root>
  )
}
